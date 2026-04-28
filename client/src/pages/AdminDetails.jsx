import { LogOut, Mail, Pencil, Phone, Building2, UserRound, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import Navbar from '../layouts/Navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDetails = () => {

  const navigate = useNavigate();

  // 🔒 ADMIN PROTECTION
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // 🔁 BACKEND: later this will come from token/session

    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, []);

  // 🧠 FORM STATE
  const [venue, setVenue] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    capacity: "",
    price: "",
    description: "",
    amenities: ""
  });

  // 📝 HANDLE INPUT
  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  // ➕ CREATE VENUE
  const handleCreateVenue = async () => {

    // ❌ CURRENT (FAKE STORAGE)
    const existing = JSON.parse(localStorage.getItem("venues")) || [];
    localStorage.setItem("venues", JSON.stringify([...existing, venue]));

    // 🔁 BACKEND (REPLACE THIS)
    /*
    await axios.post("/venues", venue);
    */

    alert("Venue Created!");
    console.log("Venue:", venue);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {

    // ❌ CURRENT
    localStorage.removeItem("user");

    // 🔁 BACKEND
    /*
    await axios.post("/logout");
    */

    navigate("/login");
  };

  return (
    <>
      <div className='bg-white'>
        <Navbar/>

        <div className='flex gap-3 pt-23'>

          <div className='bg-gray-200 w-100 p-4'>
            <div className='flex p-2 border-b-2 border-b-gray-700 gap-2'>
              <img className='h-20 w-20 rounded-full' src='https://plus.unsplash.com/premium_photo-1738637233381-6f857ce13eb9?w=600'/>
              <div className='p-3'>
                <h1 className='text-3xl'> ALexa Johnson</h1>
                <p>Owner</p>
              </div>
            </div>

            <div className='text-3xl text-indigo-950 p-3 space-y-2'>
              <h3>Dashboard</h3>
              <h3>My Venues</h3>
              <h3>Profile</h3>

              {/* 🚪 LOGOUT */}
              <h3 onClick={handleLogout} className='flex gap-3 cursor-pointer'>
                <LogOut size={50}/>Logout
              </h3>
            </div>
          </div>

          <div className='flex flex-col gap-3 p-3'>

            {/* PROFILE (UNCHANGED) */}

            <div className='bg-gray-200 h-80 w-250 px-10 py-2 rounded-2xl shadow-md'>
              <div className='p-4'>
                <motion.h1 className='text-4xl text-indigo-950 px-7 flex'>
                  Owner Profile
                  <motion.div className='ml-auto' whileHover={{scale:1.2}}>
                    <Pencil size={20}/>
                  </motion.div>
                </motion.h1>
              </div>
            </div>

            {/* CREATE VENUE */}

            <div className='w-250 bg-gray-200 rounded-2xl flex flex-col gap-2'>
              <h1 className='flex gap-1 p-5'><Plus/>Create Venue</h1>

              <div className='flex flex-col gap-10'>

                <div className='flex flex-col gap-5 items-center'>

                  <div className='flex gap-20'>
                    <div>
                      <h2>Venue Name</h2>
                      <input name="name" onChange={handleChange} className='border-2 h-12 w-100 rounded-xl'/>
                    </div>

                    <div>
                      <h2>Venue Type</h2>
                      <input name="type" onChange={handleChange} className='border-2 h-12 w-100 rounded-xl'/>
                    </div>
                  </div>

                  <div className='flex gap-20'>
                    <div>
                      <h2>Address</h2>
                      <input name="address" onChange={handleChange} className='border-2 h-12 w-100 rounded-xl'/>
                    </div>

                    <div>
                      <h2>City</h2>
                      <input name="city" onChange={handleChange} className='border-2 h-12 w-100 rounded-xl'/>
                    </div>
                  </div>

                  <div className='flex gap-20'>
                    <div>
                      <h2>Seating Capacity</h2>
                      <input name="capacity" onChange={handleChange} type="number" className='border-2 h-12 w-100 rounded-xl'/>
                    </div>

                    <div>
                      <h2>Price/hour</h2>
                      <input name="price" onChange={handleChange} type="number" className='border-2 h-12 w-100 rounded-xl'/>
                    </div>
                  </div>

                </div>

                <div className='px-10'>
                  <p>Description</p>
                  <textarea name="description" onChange={handleChange} className='border-2 h-50 w-200 rounded-2xl'/>
                </div>

                <div className='px-10'>
                  <h2>Add Amenities</h2>
                  <input name="amenities" onChange={handleChange} className='border-2 h-12 w-100 rounded-xl'/>
                </div>

                 {/* image*/}
                <div className='flex flex-col items-center justify-center '>
                  <img src={handleChange}  className='h-80 w-230 rounded-2xl object-cover bg-no-repeat bg-cover  border-2' alt="image " />
                </div>

                {/* ➕ CREATE BUTTON */}
                <div className='px-10 pb-5'>
                  <button
                    onClick={handleCreateVenue}
                    className='bg-indigo-950 text-white px-5 py-2 rounded-xl'
                  >
                    Create Venue
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDetails