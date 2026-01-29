import imagekit from "../config/imageKit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import fs from "fs";
import Booking from "../models/Booking.js";

// ===============================
// Change role to owner
// ===============================
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    // ✅ FIX: update, not delete
    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log("Change Role ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ===============================
// Add car
// ===============================
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars", // ✅ FIXED
    });

    // Generate optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: 1280 },     // ✅ FIXED
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    // Delete temp file
    fs.unlinkSync(imageFile.path);

    await Car.create({
      ...car,
      owner: _id,
      image: optimizedImageUrl,
    });

    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log("Add Car ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};


//API to Get the Owner Details
export const getOwnerCars =async (req, res)=>{
    try {
        const {_id}= req.user;
        const cars= await Car.find({owner:_id});
        res.json({success: true, cars})
    } catch (error) {
        console.log("Get Car ERROR:", error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to toggel Car Availablity

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "User Mismatched" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log("Car Toggle ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};


//API to Delete Car

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "User Mismatched" });
    }

    car.owner = null;
    car.isAvailable = false;
    await car.save();

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log("Car Delete ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};


//API to get Dashboard data

export const getDashboardData = async (req, res)=>{
    try {
        const {_id, role}= req.user;

        if(role!== 'owner'){
            return res.json({success: false, message: "You are not the owner"})
        }
        const cars= await Car.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1});

        const pendingBookings = await Booking.find({owner:_id, status: "pending"})
        const completedBookings = await Booking.find({owner:_id, status: "confirmed"})

        const monthlyRevenue= bookings.slice().filter(booking => booking.status ==='confirmed').reduce((acc, booking)=> acc+booking.price, 0);

        const dashboardData = {
          totalCars: cars.length, 
          totalBookings: bookings.length,
          pendingBookings: pendingBookings.length,
          completedBookings: completedBookings.length,
          recentBookings: bookings.slice(0,3),
          monthlyRevenue
        }
        res.json({success: true, dashboardData});
    } catch (error) {
        console.log("Car Toggle ERROR:", error.message);
        res.json({ success: false, message: error.message });
    }
}


//API to update user profile image

export const updateUserImage = async (req, res)=>{
    try {
    const { _id } = req.user;
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users", // ✅ FIXED
    });

    // Generate optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: 400 },     // ✅ FIXED
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    // Delete temp file
    fs.unlinkSync(imageFile.path);

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, {image});

    res.json({ success: true, message: "Profile Image updated successfully" });
  } catch (error) {
    console.log("Add Car ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
}