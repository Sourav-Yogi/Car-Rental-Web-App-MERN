import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react'

const CarDetails = () => {
  const { id } = useParams();

  const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate,currency}=useAppContext()

  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} =await axios.post('/api/booking/create',{
        car:id,
        pickupDate,
        returnDate
      })

      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [id,cars]);

  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-sm text-gray-500 hover:text-gray-700 hover:cursor-pointer"
      >
        <img src={assets.arrow_icon} className="rotate-180 opacity-65 " />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Left: Car Image & Details */}
        <motion.div 
         initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration: 0.6}} 
        className="lg:col-span-2">
          <motion.img
             initial={{opacity:0,scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration: 0.5}} 
            src={car.image}
            alt=""
            className="w-full h-auto max-h-105 object-cover rounded-2xl mb-5 shadow-sm"
          />

          <motion.div 
             initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.5,delay:0.2}} 
          className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {car.category} • {car.year}
              </p>
            </div>
          </motion.div>

          <hr className="border-borderColor my-5" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: assets.users_icon,
                text: `${car.seating_capacity} Seats`,
              },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map((elem, index) => (
              <motion.div
                 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration: 0.4}} 
                key={index}
                className="flex flex-col items-center bg-light px-3 py-4 rounded-lg text-sm text-gray-600"
              >
                <img src={elem.icon} alt="" className="h-4 mb-1 opacity-80" />
                {elem.text}
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-10">
            <h1 className="text-xl font-medium mb-3">Description</h1>
            <p className="text-gray-500">{car.description}</p>
          </div>
          {/* Feature */}
          <div className="mb-10">
            <h1 className="text-xl font-medium mb-3 mt-3">Features</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "360 Camera",
                "Bluetooth",
                "GPS",
                "Heated Seats",
                "Rear View Mirror",
              ].map((item) => (
                <li key={item} className="flex items-center text-gray-500">
                  <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.form
         initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration: 0.6,delay:0.3}} 
        onSubmit={handleSubmit} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500">
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>

          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="return-date"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dull transition-all cursor-pointer"
          >
            Book Now
          </button>

          <p className="text-center text-sm">No credit card required to reserve</p>

        </motion.form>
      </div>
    </div>
  );
};

export default CarDetails;
