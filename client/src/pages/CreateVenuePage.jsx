import React, { useState } from 'react'
import API from "../services/api";
import { useNavigate } from 'react-router-dom'

const CreateVenuePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    category: "Conference",
    capacity: "",
    pricePerHour: "",
    amenities: ""
  });

  // Keep track of the actual file object selected by the browser input
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // ✅ HANDLE TEXT INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ HANDLE FILE SELECTION & PREVIEW GENERATION
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Creates a temporary browser preview string
    }
  };

  // ✅ CREATE VENUE (Using Multi-part FormData)
  const handleSubmit = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!imageFile) {
        alert("Please select an image file to upload ❌");
        return;
      }

      // 1. Initialize FormData instance
      const formData = new FormData();

      // 2. Append text fields
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("capacity", Number(form.capacity));
      formData.append("pricePerHour", Number(form.pricePerHour));

      // 3. Process amenities array and append each item individually
      const amenitiesArray = form.amenities
        ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [];
      
      amenitiesArray.forEach((amenity) => {
        formData.append("amenities[]", amenity);
      });

      // 4. Attach the binary image payload file
      formData.append("image", imageFile);

      // 5. Fire request configuration using multipart form-data headers
      await API.post(
        "/venues",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" // Allows backend multer middleware to parse the fields
          },
        }
      );

      alert("Venue Created Successfully ✅");
      navigate("/VenuePage");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Venue creation failed ❌"
      );
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[500px] flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center mb-3">
          Create Venue
        </h1>

        {/* NAME */}
        <input
          name="name"
          placeholder="Venue Name"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-3 rounded h-28"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* CATEGORY */}
        <select
          name="category"
          onChange={handleChange}
          className="border p-3 rounded"
          value={form.category}
        >
          <option value="Conference">Conference</option>
          <option value="Meeting">Meeting</option>
          <option value="Boardroom">Boardroom</option>
          <option value="Training">Training</option>
          <option value="Workshop">Workshop</option>
          <option value="Event Hall">Event Hall</option>
          <option value="Outdoor">Outdoor</option>
        </select>

        {/* CAPACITY */}
        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* PRICE */}
        <input
          name="pricePerHour"
          type="number"
          placeholder="Price Per Hour"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* AMENITIES */}
        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* FILE INPUT INTERFACE */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded text-sm bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* LOCAL IMAGE PREVIEW WINDOW */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Upload Preview"
            className="h-52 w-full object-cover rounded-lg border border-gray-200 mt-2"
          />
        )}

        {/* ACTION BUTTON */}
        <button
          onClick={handleSubmit}
          className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded font-bold transition mt-2"
        >
          Create Venue
        </button>
      </div>
    </div>
  )
}

export default CreateVenuePage;