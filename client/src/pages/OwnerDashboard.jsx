import React, { useEffect, useState } from "react";
import {
  Building2,
  PlusCircle,
  User,
  LogOut,
  TrendingUp,
  Clock7,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [user, setUser] = useState(null);

  // =========================
  // LOAD USER + VENUES
  // =========================
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    fetchVenues(storedUser);
  }, []);

  // =========================
  // FETCH VENUES
  // =========================
  const fetchVenues = async (storedUser) => {
    try {
      const res = await API.get("/venues/owner/my-venues", {
        headers: {
          Authorization: `Bearer ${storedUser.token}`
        }
      });
      setVenues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // DELETE VENUE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    
    try {
      await API.delete(`/venues/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      setVenues(venues.filter((venue) => venue._id !== id));
      alert("Venue deleted ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed ❌");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // =========================
  // CALCULATE METRICS (Admin Style)
  // =========================
  const totalVenues = venues.length;

  // Assuming your backend populates bookings/analytics inside the venue schema
  const totalBookingsReceived = venues.reduce((acc, v) => acc + (v.bookingsCount || 0), 0);
  const totalRevenueGenerated = venues.reduce((acc, v) => acc + (v.totalEarnings || 0), 0);
  const averagePricePerHour = totalVenues > 0 
    ? Math.round(venues.reduce((acc, v) => acc + v.pricePerHour, 0) / totalVenues) 
    : 0;

  return (
    <div className="bg-white min-h-screen w-screen pt-24">
      <div className="flex">
        
        {/* SIDEBAR */}
        <div className="bg-gray-200 w-80 p-4 min-h-[calc(100vh-6rem)]">
          <div className="flex p-2 border-b-2 border-gray-400 gap-2 items-center">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
            />
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600 capitalize">{user?.role || "Owner"}</p>
            </div>
          </div>

          <div className="text-xl text-indigo-950 mt-5 space-y-4 flex flex-col items-start w-full">
            <button
              onClick={() => navigate("/owner")}
              className="cursor-pointer font-semibold text-left w-full py-1 hover:text-indigo-700"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/ownerProfile")}
              className="cursor-pointer text-left w-full py-1 hover:text-indigo-700"
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/create-venue")}
              className="flex items-center gap-2 cursor-pointer text-green-700 font-semibold text-left w-full py-1 hover:text-green-900"
            >
              <PlusCircle size={20} /> Create Venue
            </button>

            <button
              onClick={handleLogout}
              className="flex gap-2 cursor-pointer text-red-600 font-semibold text-left w-full py-1 hover:text-red-800"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mb-6">
            Here is your venue performance summary.
          </p>

          {/* STATS MATRIX */}
          <div className="flex gap-5 flex-wrap mb-8">
            
            <div className="h-32 w-60 bg-white rounded-xl p-4 shadow">
              <h1 className="flex text-gray-700 font-medium">
                Active Venues
                <span className="ml-auto text-indigo-950">
                  <Building2 />
                </span>
              </h1>
              <h2 className="text-3xl font-bold mt-2">{totalVenues}</h2>
            </div>

            <div className="h-32 w-60 bg-white rounded-xl p-4 shadow">
              <h1 className="flex text-gray-700 font-medium">
                Total Bookings
                <span className="ml-auto text-indigo-950">
                  <Layers />
                </span>
              </h1>
              <h2 className="text-3xl font-bold mt-2">{totalBookingsReceived}</h2>
            </div>

            <div className="h-32 w-60 bg-white rounded-xl p-4 shadow">
              <h1 className="flex text-gray-700 font-medium">
                Avg. Rate / Hr
                <span className="ml-auto text-indigo-950">
                  <Clock7 />
                </span>
              </h1>
              <h2 className="text-3xl font-bold mt-2">₹{averagePricePerHour}</h2>
            </div>

            <div className="h-32 w-60 bg-white rounded-xl p-4 shadow">
              <h1 className="flex text-gray-700 font-medium">
                Est. Earnings
                <span className="ml-auto text-indigo-950">
                  <TrendingUp />
                </span>
              </h1>
              <h2 className="text-3xl font-bold mt-2">₹{totalRevenueGenerated}</h2>
            </div>

          </div>

          {/* VENUES DATA SECTION */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <h1 className="p-4 text-2xl font-bold border-b">Managed Venues</h1>

            {venues.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-lg text-gray-600 mb-4">No venues listed yet</p>
                <button
                  onClick={() => navigate("/create-venue")}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                >
                  Create Your First Venue
                </button>
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((v) => (
                  <div
                    key={v._id}
                    className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <img
                      src={v.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500"}
                      alt={v.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{v.name}</h2>
                        <p className="text-gray-600 mt-1 text-sm">{v.location}</p>
                        <p className="font-bold mt-2 text-indigo-950 text-lg">
                          ₹{v.pricePerHour}/hour
                        </p>
                      </div>

                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={() => navigate("/edit-venue", { state: { venue: v } })}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(v._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;