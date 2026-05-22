import React, { useState, useEffect } from "react";
import { Pencil, LogOut, Building2, PlusCircle, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Changed 'motion/react' to typical framer-motion import
import API from "../services/api";

const OwnerDetails = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // =========================
  // PROTECTION
  // =========================
  useEffect(() => {
    if (!storedUser || storedUser.role !== "owner") {
      navigate("/login");
    }
  }, []);

  // =========================
  // STATE MANAGEMENT
  // =========================
  const [name, setName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [password, setPassword] = useState("");

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
  // FORM HANDLING
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
  const handleUpdate = async () => {
    try {
      const res = await API.put(
        "/auth/profile",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );

      // Preserve token structure if payload varies
      const updatedUserData = { ...res.data, token: res.data.token || storedUser.token };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      alert("Profile updated ✅");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed ❌");
    }
  };

  // =========================
  // CREATE VENUE
  // =========================
  const handleCreateVenue = async () => {
    try {
      const formData = new FormData();
      formData.append("name", venue.name);
      formData.append("description", venue.description);
      formData.append("location", venue.location);
      formData.append("category", venue.category);
      formData.append("capacity", venue.capacity);
      formData.append("pricePerHour", venue.pricePerHour);
      formData.append("amenities", venue.amenities);
      if (image) formData.append("image", image);

      await API.post("/venues", formData, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Venue Created ✅");
      navigate("/owner");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating venue");
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
    <div className="bg-white min-h-screen pt-24">
      <div className="flex gap-3 pt-6">
        
        {/* SIDEBAR */}
        <div className="bg-gray-200 w-80 p-4 min-h-[calc(100vh-6rem)]">
          <div className="flex p-2 border-b-2 border-b-gray-500 gap-2 items-center">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
            />
            <div className="p-3">
              <h1 className="text-2xl font-bold">{storedUser?.name}</h1>
              <p className="capitalize text-gray-600">{storedUser?.role}</p>
            </div>
          </div>

          <div className="text-2xl text-indigo-950 p-3 space-y-4 flex flex-col items-start w-full">
            <h3 className="cursor-pointer hover:text-indigo-700" onClick={() => navigate("/owner")}>
              Dashboard
            </h3>
            <h3 className="cursor-pointer hover:text-indigo-700" onClick={() => navigate("/ownerProfile")}>
              Profile
            </h3>
            <h3 onClick={handleLogout} className="flex gap-3 cursor-pointer text-red-600 items-center hover:text-red-800">
              <LogOut /> Logout
            </h3>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="flex flex-col gap-5 p-3 flex-1 max-w-[1000px]">
          
          {/* PROFILE CARD */}
          <div className="bg-gray-200 rounded-2xl shadow-md p-10 w-full">
            <motion.h1 className="text-4xl text-indigo-950 flex items-center">
              Owner Profile
              <motion.div className="ml-auto" whileHover={{ scale: 1.2 }}>
                <Pencil size={20} />
              </motion.div>
            </motion.h1>

            <div className="flex flex-col gap-5 mt-10">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border-2 h-12 rounded-xl px-4 bg-white"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border-2 h-12 rounded-xl px-4 bg-white"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password (leave blank to remain unchanged)"
                className="border-2 h-12 rounded-xl px-4 bg-white"
              />

              <button
                onClick={handleUpdate}
                className="bg-indigo-950 hover:bg-indigo-900 transition text-white py-3 rounded-xl font-medium"
              >
                Save Profile Changes
              </button>
            </div>
          </div>

          {/* CREATE VENUE CARD */}
          <div className="bg-gray-200 rounded-2xl flex flex-col gap-5 p-10 w-full shadow-md">
            <h1 className="flex gap-2 text-3xl text-indigo-950 font-bold items-center">
              <Plus /> Create Venue
            </h1>

            <input
              name="name"
              placeholder="Venue Name"
              onChange={handleChange}
              className="border-2 h-12 rounded-xl px-4 bg-white"
            />

            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="border-2 h-12 rounded-xl px-4 bg-white"
            />

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="border-2 h-12 rounded-xl px-4 bg-white"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              onChange={handleChange}
              className="border-2 h-12 rounded-xl px-4 bg-white"
            />

            <input
              type="number"
              name="pricePerHour"
              placeholder="Price Per Hour"
              onChange={handleChange}
              className="border-2 h-12 rounded-xl px-4 bg-white"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="border-2 rounded-2xl p-4 h-40 bg-white resize-none"
            />

            <input
              name="amenities"
              placeholder="Amenities (comma separated)"
              onChange={handleChange}
              className="border-2 h-12 rounded-xl px-4 bg-white"
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-2 p-3 rounded-xl bg-white"
            />

            {/* IMAGE PREVIEW */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="h-80 w-full rounded-2xl object-cover border"
                alt="preview"
              />
            )}

            <button
              onClick={handleCreateVenue}
              className="bg-indigo-950 hover:bg-indigo-900 transition text-white py-3 rounded-xl font-medium"
            >
              Create Venue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;