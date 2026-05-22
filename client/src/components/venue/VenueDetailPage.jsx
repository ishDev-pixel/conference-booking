import React, { useState } from 'react'
import { CalendarDays, Clock, CarFront, SquareArrowOutUpRight } from 'lucide-react'
import About from '../../layouts/About'
import { motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from "../../services/api"; 

const VenueDetailPage = () => {

  const location = useLocation();
  const venue = location.state?.venue;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    seats: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Login first");
        return;
      }

      if (!form.date || !form.startTime || !form.endTime) {
        alert("Please fill all fields");
        return;
      }

      // ✅ prevent invalid time
      if (form.startTime >= form.endTime) {
        alert("End time must be after start time");
        return;
      }

      const startHour = form.startTime.split(":")[0];
      const endHour = form.endTime.split(":")[0];

      const res = await API.post("/bookings", {
        venue: venue?._id,
        date: form.date,
        startTime: startHour,
        endTime: endHour,
        seats: form.seats
      });

      console.log(res.data);

      // ✅ SAFE navigation
      navigate("/payment", {
        state: { bookingId: res.data?._id || res.data?.booking?._id }
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed ❌");
    }
  };

  // ❗ safety fallback
  if (!venue) {
    return <div className="p-10">No venue data found</div>;
  }

  return (
    <div className='pt-24 h-screen w-screen'>
      <div className='flex flex-col gap-3 justify-center items-center'>

        {/* HEADER */}
        <div className='h-20 w-350 flex'>
          <div>
            <h1 className='text-5xl font-bold'>{venue.name}</h1>
            <p className='text-xl'>{venue.address}, {venue.city}</p>
          </div>
        <a
  target="_blank"
  rel="noreferrer"
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.mapLink}`
  )}`}
  
  className='ml-auto flex items-center gap-2 text-blue-600 font-bold'
>
  Get Direction
  <SquareArrowOutUpRight />
  
</a>
        </div>

        {/* IMAGE */}
        <div
          className='h-100 w-350 bg-cover rounded-xl'
          style={{ backgroundImage: `url(${venue.image})` }}
        ></div>

        <div className='h-120 w-350 flex gap-4'>

          {/* LEFT */}
          <div className='h-full w-250'>
            <div className='p-4 flex flex-col gap-2'>
              <div className="flex">
                <h1 className='text-4xl'>About</h1>
                <h2 className='text-4xl font-bold ml-auto'>
                  ₹{venue.pricePerHour}
                </h2>
              </div>

              <p>{venue.description}</p>
            </div>

            <div>
              <h1 className='text-4xl p-4'>Building Amenities</h1>
              <div className='grid grid-cols-5 gap-2 px-8 py-4'>
                <div className='flex gap-2 items-center'>
                  <CarFront size={30}/> Parking
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className='shadow-xl bg-white h-full w-100 flex flex-col gap-3 items-center justify-center'>
            
            <p className='text-3xl'>Select Your Preference</p>

            <div className='flex flex-col gap-5 text-xl'>

              <div>
                <h2 className='flex items-center gap-2'><CalendarDays/>Select Date</h2>
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className='border-2 w-80'
                  type="date"
                />
              </div>

              <div>
                <h2 className='flex items-center gap-2'><Clock/>Start Time</h2>
                <input
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className='border-2 w-80'
                  type='time'
                />
              </div>

              <div>
                <h2 className='flex items-center gap-2'><Clock/>End Time</h2>
                <input
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className='border-2 w-80'
                  type='time'
                />
              </div>

              <div>
                <h2>Select Seats</h2>
                <input
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  className='border-2 w-80'
                  type="number"
                />
              </div>

            </div>

           {(user?.role === "admin" || user?.role === "owner") ? (
  <motion.button
    onClick={() => navigate("/EditVenue", { state: { venue } })}
    whileHover={{
      backgroundColor: "green",
      color: "white"
    }}
    className='border-2 h-10 w-40 rounded-xl text-xl'
  >
    Edit Venue
  </motion.button>
) : (
  <motion.button
    onClick={handleBooking}
    whileHover={{
      backgroundColor: 'gray',
      color: 'white'
    }}
    className='border-2 h-10 w-25 rounded-xl text-xl'
  >
    Book Now
  </motion.button>
)}

          </div>
        </div>

        {/* ADDRESS */}
        <div className='h-30 w-350'>
          
          <h1 className='text-4xl'>Address</h1>
          <a
  target="_blank"
  rel="noreferrer"
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue.location
  )}`}
  className='text-xl text-blue-600 underline'
>
  {venue.location}
</a>
        
        </div>

      </div>

      <About/>
    </div>
  )
}

export default VenueDetailPage;