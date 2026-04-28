import React from 'react'
import { MapPin, UserRound } from "lucide-react"
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

const BookingPage = ({ venues }) => {

  const navigate = useNavigate();

  // 📅 BOOK VENUE
  const handleBooking = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      venueName: venues?.name,
      userEmail: user.email,
      date: new Date().toLocaleString()
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    // 🔁 BACKEND
    
    await axios.post("/api/bookings", {
      venueId: venues.id,
      userId: user.id
    });
   

    alert("Venue Booked!");
  };

  // 🔍 GO TO DETAIL PAGE
  const handleDetails = () => {
    navigate("/venue-details", { state: { venue: venues } });
  };

  return (
    <div className='bg-white shadow-lg hover:shadow-gray-400 h-100 w-80 rounded-xl text-indigo-950 gap-5'>
      
      <div className='p-2'>
        <img
          className="rounded-t-xl object-cover"
          src="https://plus.unsplash.com/premium_photo-1681487146511-43e0a6382a83?w=600"
        />

        <div className='flex flex-col gap-2'>

          <div className='flex flex-col gap-2'>
            
            <h3 className='flex'>
              <MapPin size={20}/>
              {venues?.city || "Location"}
            </h3>

            <h2 className='font-bold text-2xl'>
              {venues?.name || "Venue Name"}
            </h2>

            <div className='grid grid-cols-2 grid-rows-2 gap-2'>
              <h4 className='bg-gray-300 rounded-2xl h-6 w-30 text-center'>Style: Boardroom</h4>
              <h4 className='bg-gray-300 rounded-2xl h-6 w-30 text-center'>4k Display</h4>
              <h4 className='bg-gray-300 rounded-2xl h-6 w-30 text-center'>Projector</h4>
            </div>
          </div>
          
          <div className='flex gap-5 p-1 font-bold border-t-2 border-gray-400'>
            
            <h3 className='flex text-2xl'>
              <UserRound size={30}/>
              {venues?.capacity || "0"}
            </h3>

            <button className='rounded-md w-26 h-10 font-bold'>
              ₹{venues?.price || "0"}
            </button>
                { /* 📅 OPTIONAL BOOK BUTTON (separate) */}
              <motion.button
            onClick={handleBooking}
            className='bg-green-600 text-white rounded-md h-10 w-50'
          >
           Book
          </motion.button>

            {/* 🔍 DETAILS BUTTON */}
            <motion.button
              onClick={handleDetails}
              whileHover={{backgroundColor:"white",border:"1px solid indigo",color:"indigo"}}
              whileTap={{backgroundColor:"indigo",color:"white"}}
              className='bg-indigo-950 text-white rounded-md w-60 h-10'
            >
              Details
            </motion.button>

          </div>

          
        

        </div>
      </div>
    </div>
  )
}

export default BookingPage