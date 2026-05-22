import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from "../services/api";

const EditVenue = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const venue = location.state?.venue;

  // ✅ SAFETY
  if (!venue) {
    return (
      <div className='pt-24 p-10 text-2xl'>
        No Venue Data Found
      </div>
    )
  }

  // ✅ STATES
  const [name, setName] = useState(venue?.name || "");
  const [description, setDescription] = useState(venue?.description || "");
  const [locationText, setLocationText] = useState(venue?.location || "");
  const [category, setCategory] = useState(venue?.category || "");
  const [capacity, setCapacity] = useState(venue?.capacity || "");
  const [pricePerHour, setPricePerHour] = useState(venue?.pricePerHour || "");
  const [amenities, setAmenities] = useState(venue?.amenities?.join(", ") || "");
  const [image, setImage] = useState(venue?.image || "");

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // Convert comma separated string to an array safely
      const parsedAmenities = amenities
        ? amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [];

      await API.put(
        `/venues/${venue._id}`,
        {
          name,
          description,
          location: locationText,
          category,
          capacity: Number(capacity),
          pricePerHour: Number(pricePerHour),
          amenities: parsedAmenities, // ✅ Sent as clean array
          image
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Venue Updated Successfully! ✅");
      if (user=="admin"){
        navigate("/AdminDashboard");
      }else{
      navigate("/owner"); // Redirect back to owner dashboard to see changes
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Update failed ❌"
      );
    }
  };

  return (
    <div className='pt-24 min-h-screen bg-gray-100 flex justify-center items-center p-10'>
      <div className='bg-white shadow-xl rounded-2xl p-8 w-[600px] flex flex-col gap-4'>
        <h1 className='text-3xl font-bold text-center'>
          Edit Venue
        </h1>

        {/* NAME */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Venue Name</label>
        <input
          className='border p-3 rounded'
          placeholder='Venue Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Description</label>
        <textarea
          className='border p-3 rounded h-28'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* LOCATION */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Location</label>
        <input
          className='border p-3 rounded'
          placeholder='Location / Address'
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
        />
      
        {/* CATEGORY */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Category</label>
        <select
          className='border p-3 rounded'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Conference</option>
          <option>Meeting</option>
          <option>Boardroom</option>
          <option>Training</option>
          <option>Workshop</option>
          <option>Event Hall</option>
          <option>Outdoor</option>
        </select>

        {/* CAPACITY */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Capacity</label>
        <input
          className='border p-3 rounded'
          type='number'
          placeholder='Capacity'
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        {/* PRICE */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Price Per Hour</label>
        <input
          className='border p-3 rounded'
          type='number'
          placeholder='Price Per Hour'
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
        />

        {/* AMENITIES */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Amenities (comma separated)</label>
        <input
          className='border p-3 rounded'
          placeholder='Amenities (comma separated)'
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />

        {/* IMAGE URL */}
        <label className="text-sm font-semibold -mb-2 text-gray-600">Image URL</label>
        <input
          className='border p-3 rounded'
          placeholder='Image URL'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* IMAGE PREVIEW */}
        {image && (
          <img
            src={image}
            alt='venue'
            className='h-60 w-full object-cover rounded-xl mt-2'
          />
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className='bg-blue-700 hover:bg-blue-800 text-white py-3 rounded font-bold mt-4'
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditVenue;