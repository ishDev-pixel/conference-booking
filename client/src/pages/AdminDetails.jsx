import {
  LogOut,
  Pencil,
  Plus
} from "lucide-react";

import { motion } from "motion/react";
import Navbar from "../layouts/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDetails = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // =========================
  // PROFILE STATE
  // =========================
  const [name, setName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");

  // =========================
  // VENUE STATE
  // =========================
  const [venue, setVenue] = useState({
    name: "",
    description: "",
    location: "",
    category: "",
    capacity: "",
    pricePerHour: "",
    amenities: "",
  });

  const [image, setImage] = useState(null);

  // =========================
  // ADMIN PROTECTION
  // =========================
  useEffect(() => {
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
    }
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setVenue({
      ...venue,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleProfileUpdate = async () => {
    try {
      const res = await API.put(
        "/auth/profile",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Profile update failed ❌");
    }
  };

  // =========================
  // CREATE VENUE
  // =========================
  const handleCreateVenue = async () => {
    try {
      if (!image) {
        alert("Please select a physical image file to upload ❌");
        return;
      }

      const formData = new FormData();
      formData.append("name", venue.name);
      formData.append("description", venue.description);
      formData.append("location", venue.location);
      formData.append("category", venue.category);
      
      // Explicitly convert numeric text properties into absolute values
      formData.append("capacity", Number(venue.capacity));
      formData.append("pricePerHour", Number(venue.pricePerHour));

      // Fix the mapping error by parsing the comma-separated string into individual elements
      const amenitiesArray = venue.amenities
        ? venue.amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [];
      
      amenitiesArray.forEach((amenity) => {
        formData.append("amenities[]", amenity);
      });

      // Append raw binary image target 
      formData.append("image", image);

      await API.post(
        "/venues",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
            "Content-Type": "multipart/form-data", // Handled by backend multer middleware
          },
        }
      );

      alert("Venue Created ✅");
      navigate("/VenuePage");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Error creating venue ❌"
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='bg-white min-h-screen pt-24'>
      <Navbar />

      <div className='flex gap-3 pt-24'>
        {/* SIDEBAR */}
        <div className='bg-gray-200 w-80 p-4'>
          <div className='flex p-2 border-b-2 border-b-gray-500 gap-2'>
            <img
              className='h-20 w-20 rounded-full object-cover'
              src='https://i.pravatar.cc/150'
              alt='profile'
            />
            <div className='p-3'>
              <h1 className='text-2xl font-bold'>
                {storedUser?.name}
              </h1>
              <p className='capitalize'>
                {storedUser?.role}
              </p>
            </div>
          </div>

          <div className='text-2xl text-indigo-950 p-3 space-y-4'>
            <h3
              className='cursor-pointer hover:text-indigo-700 transition'
              onClick={() => navigate("/AdminDashboard")}
            >
              Dashboard
            </h3>
            <h3
              className='cursor-pointer hover:text-indigo-700 transition'
              onClick={() => navigate("/AdminDashboard")}
            >
              My Venues
            </h3>
            <h3 className='cursor-pointer text-indigo-600 font-semibold'
            onClick={() => navigate("/AdminDetails")}>
              Profile
            </h3>
            <h3
              onClick={handleLogout}
              className='flex gap-3 cursor-pointer text-red-600 hover:text-red-800 transition'
            >
              <LogOut />
              Logout
            </h3>
          </div>
        </div>

        {/* MAIN CONTROLLER VIEWPORT */}
        <div className='flex flex-col gap-5 p-3 flex-1'>
          {/* PROFILE SECTION */}
          <div className='bg-gray-200 max-w-[1000px] w-full rounded-2xl shadow-md p-10'>
            <motion.h1 className='text-4xl text-indigo-950 flex items-center justify-between'>
              Admin Profile
              <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                <Pencil size={20}/>
              </motion.div>
            </motion.h1>

            <div className='flex flex-col gap-5 mt-10'>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className='border-2 h-12 rounded-xl px-4 bg-white'
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='border-2 h-12 rounded-xl px-4 bg-white'
              />
              <button
                onClick={handleProfileUpdate}
                className='bg-indigo-950 hover:bg-indigo-900 transition text-white py-3 rounded-xl font-bold'
              >
                Save Profile Changes
              </button>
            </div>
          </div>

          {/* CREATE VENUE FORM */}
          <div className='max-w-[1000px] w-full bg-gray-200 rounded-2xl flex flex-col gap-5 p-10 shadow-md'>
            <h1 className='flex items-center gap-2 text-3xl font-bold text-indigo-950'>
              <Plus />
              Create New Venue
            </h1>

            <input
              name='name'
              value={venue.name}
              placeholder='Venue Name'
              onChange={handleChange}
              className='border-2 h-12 rounded-xl px-4 bg-white'
            />

            <input
              name='category'
              value={venue.category}
              placeholder='Category (e.g. Conference, Meeting)'
              onChange={handleChange}
              className='border-2 h-12 rounded-xl px-4 bg-white'
            />

            <input
              name='location'
              value={venue.location}
              placeholder='Location Address'
              onChange={handleChange}
              className='border-2 h-12 rounded-xl px-4 bg-white'
            />

            <input
              type='number'
              name='capacity'
              value={venue.capacity}
              placeholder='Capacity Limit'
              onChange={handleChange}
              className='border-2 h-12 rounded-xl px-4 bg-white'
            />

            <input
              type='number'
              name='pricePerHour'
              value={venue.pricePerHour}
              placeholder='Price Per Hour'
              onChange={handleChange}
              className='border-2 h-12 rounded-xl px-4 bg-white'
            />

            <textarea
              name='description'
              value={venue.description}
              placeholder='Detailed Description'
              onChange={handleChange}
              className='border-2 rounded-2xl p-4 h-40 bg-white resize-none'
            />

            <input
              name='amenities'
              value={venue.amenities}
              placeholder='Amenities (comma separated, e.g. WiFi, Projector, AC)'
              onChange={handleChange}
              className='border-2 h-12 rounded-xl px-4 bg-white'
            />

            {/* RAW FILE SELECTOR */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Upload Cover Image</label>
              <input
                type='file'
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className='border-2 p-3 rounded-xl bg-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-950 hover:file:bg-indigo-100 cursor-pointer'
              />
            </div>

            {/* INTERACTIVE MEDIA REPLAY */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className='h-80 w-full rounded-2xl object-cover border border-gray-300 shadow-inner'
                alt='preview'
              />
            )}

            <button
              onClick={handleCreateVenue}
              className='bg-indigo-950 hover:bg-indigo-900 transition text-white py-3 rounded-xl font-bold mt-2'
            >
              Create Venue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;