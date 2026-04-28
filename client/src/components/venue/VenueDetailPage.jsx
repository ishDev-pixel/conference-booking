import React, { useState } from 'react'
import { CalendarDays, Clock, CarFront, SquareArrowOutUpRight } from 'lucide-react'
import About from '../../layouts/About'
import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'

const VenueDetailPage = () => {

  // 📦 GET VENUE DATA
  const location = useLocation();
  const venue = location.state?.venue;

  // 🧠 BOOKING STATE
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    seats: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📅 BOOKING FUNCTION
  const handleBooking = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Login first");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      venueName: venue?.name,
      userEmail: user.email,
      ...form,
      dateBooked: new Date().toLocaleString()
    };

    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    // 🔁 BACKEND
    /*
    await axios.post("/bookings", {
      venueId: venue.id,
      userId: user.id,
      ...form
    });
    */

    alert("Booking Confirmed!");
  };

  return (
    <div className='pt-24 h-screen w-screen'>
      <div className='flex flex-col gap-3 justify-center items-center'>

        {/* HEADER */}
        <div className='h-20 w-350 flex'>
          <div>
            <h1 className='text-5xl font-bold'>{venue?.name}</h1>
            <p className='text-xl'>{venue?.city}</p>
          </div>
          <div className='ml-auto flex'>
            Get Direction <SquareArrowOutUpRight/>
          </div>
        </div>

        {/* IMAGE */}
        <div
          className='h-100 w-350 bg-cover'
          style={{ backgroundImage: `url(${venue?.image || ""})` }}
        ></div>

        <div className='h-120 w-350 flex gap-4'>

          {/* LEFT */}
          <div className='h-full w-250'>
            <div className='p-4 flex flex-col gap-2'>
              <div className="flex">
                <h1 className='text-4xl'>About</h1>
                <h2 className='text-4xl font-bold ml-auto'>₹{venue?.price}</h2>
              </div>

              <p>{venue?.description || "No description"}</p>
            </div>

            {/* AMENITIES (static for now) */}
            <div>
              <h1 className='text-4xl p-4'>Building Amenities</h1>
              <div className='grid grid-cols-5 gap-2 px-8 py-4'>
                <div className='flex gap-2 items-center'>
                  <CarFront size={30}/> Parking
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT (BOOKING) */}
          <div className='shadow-xl bg-white h-full w-100 flex flex-col gap-3 items-center justify-center'>
            
            <p className='text-3xl'>Select Your Preference</p>

            <div className='flex flex-col gap-5 text-xl'>

              <div>
                <h2 className='flex'><CalendarDays/>Select Date</h2>
                <input name="date" onChange={handleChange} className='border-2 w-80' type="date"/>
              </div>

              <div>
                <h2 className='flex'><Clock/>Start Time</h2>
                <input name="startTime" onChange={handleChange} className='border-2 w-80' type='time'/>
              </div>

              <div>
                <h2 className='flex'><Clock/>End Time</h2>
                <input name="endTime" onChange={handleChange} className='border-2 w-80' type='time'/>
              </div>

              <div>
                <h2>Select Seats</h2>
                <input name="seats" onChange={handleChange} className='border-2 w-80' type="number"/>
              </div>

            </div>

            {/* 📅 BOOK BUTTON */}
            <motion.button
              onClick={handleBooking}
              whileHover={{backgroundColor:'gray',color:'white'}}
              className='border-2 h-10 w-25 rounded-xl text-xl'
            >
              Book Now
            </motion.button>

          </div>
        </div>

        {/* ADDRESS */}
        <div className='h-30 w-350'>
          <h1 className='text-4xl'>Address</h1>
          <p className='text-xl'>{venue?.address}</p>
        </div>

      </div>

      <About/>
    </div>
  )
}

export default VenueDetailPage