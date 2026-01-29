import Booking from "../models/Booking.js"
import Car from "../models/Car.js";



//Function to check Availablity of car for a given date


// const checkAvailability =async (car, pickupDate, returnDate)=>{
//     const bookings=await Booking.find({
//         car, 
//         pickupDate: {$lte:returnDate},
//         returnDate: {$gte: pickupDate},
//     })

//     return bookings.length===0;
// }

const checkAvailability = async (car, pickupDate, returnDate) => {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: end },
    returnDate: { $gte: start },
  });

  return bookings.length === 0;
};


//API to check Availability of Cars for the given Date and location

export const checkAvailabilityofCar = async (req,res)=>{
    try {
        const {location, pickupDate, returnDate}=req.body;

        const cars = await Car.find({location, isAvailable: true})

        const availableCarPromises = cars.map(async (car)=>{
            const isAvailable =await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable:isAvailable}
        })

        let availableCars =await Promise.all(availableCarPromises);
        availableCars=availableCars.filter(car=>car.isAvailable===true)

        res.json({success: true, availableCars})
    } catch (error) {
        console.log("Car Availibility ERROR:", error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to create Booking

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil(
      (returned - picked) / (1000 * 60 * 60 * 24)
    );

    const price = noOfDays * carData.pricePerDay; 

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log("Create Booking ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};



// API to list user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 }); // ✅ MOVE HERE

    res.json({ success: true, bookings });
  } catch (error) {
    console.log("Get User Booking ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};


//API to List Owner Bookings
export const getOwnerBookings= async (req, res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"})
        }
        const bookings = await Booking.find({owner:req.user._id}).populate("car user").select("-user.password").sort({createdAt: -1})
        res.json({success:true, bookings})
    } catch (error) {
        console.log("Get Owner  Booking ERROR:", error.message);
        res.json({ success: false, message: error.message });
    }
}

//API  to change booking status

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Successfully changed the status" });
  } catch (error) {
    console.log("Change Booking ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

