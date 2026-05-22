import React from 'react'
import { MapPin, UserRound } from "lucide-react"
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const BookingPage = ({ venue }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/VenueDetailPage", {
      state: { venue }
    });
  };

  return (
    <div className='bg-white shadow-lg hover:shadow-gray-400 h-115 w-80 rounded-xl text-indigo-950 gap-5'>
      <div className='p-2'>
        <img
          className="rounded-t-xl object-cover h-50 w-full"
          src={venue?.image}
          alt={venue?.name}
        />

        <div className='flex flex-col gap-2 mt-3'>
          <div className='flex flex-col gap-2'>
            <h3 className='flex items-center gap-1 text-gray-600'>
              <MapPin size={20}/>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue?.location || '')}`}
                className='text-xl text-blue-600 underline'
              >
                {venue?.location}
              </a>
            </h3>

            <h2 className='font-bold text-2xl'>{venue?.name}</h2>

            <div className='grid grid-cols-2 gap-2'>
              <h4 className='bg-gray-300 rounded-2xl h-6 px-3 text-center'>{venue?.category}</h4>
              <h4 className='bg-gray-300 rounded-2xl h-6 px-3 text-center'>Capacity {venue?.capacity}</h4>
            </div>
          </div>

          <div className='flex items-center justify-between p-1 font-bold border-t-2 border-gray-400 mt-3'>
            <h3 className='flex text-2xl items-center gap-1'>
              <UserRound size={25}/>
              {venue?.capacity}
            </h3>

            <button className='rounded-md px-3 h-10 font-bold bg-gray-100'>
              ₹{venue?.pricePerHour}
            </button>

            <motion.button
              onClick={handleDetails}
              whileHover={{
                backgroundColor: "white",
                border: "1px solid indigo",
                color: "indigo"
              }}
              whileTap={{
                backgroundColor: "indigo",
                color: "white"
              }}
              className='bg-indigo-950 text-white rounded-md px-5 h-10'
            >
              Details
            </motion.button>
          </div>

          {/* DYNAMIC ACTION BUTTON ZONE */}
          {user?.role === "admin" || user?.role === "owner" ? (
            <motion.button
              onClick={() => navigate("/edit-venue", { state: { venue } })}
              whileHover={{ backgroundColor: "#2563eb" }}
              className='bg-blue-600 text-white rounded-md px-5 h-10 w-full mt-2'
            >
              Edit Venue
            </motion.button>
          ) : (
            <motion.button
              onClick={handleDetails}
              whileHover={{ backgroundColor: "#1e1b4b" }}
              className='bg-indigo-900 text-white rounded-md px-5 h-10 w-full mt-2 font-medium'
            >
              Book Now
            </motion.button>
          )} 
        </div>
      </div>
    </div>
  )
}

export default BookingPage;