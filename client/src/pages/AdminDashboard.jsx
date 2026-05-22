import React, { useEffect, useState } from "react";
import {
  Building2,
  LogOut,
  Pencil,
  Trash2,
  PlusCircle,
  ShieldCheck,
  LayoutDashboard,
  UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // ROUTE PROTECTION & API TOKEN INJECTION
  // ==========================================
  useEffect(() => {
    // Force strict validation. Match against lowercase string to prevent typo failures
    if (!storedUser || !storedUser.token || storedUser.role?.toLowerCase() !== "admin") {
      alert("Access Denied: Administrative authorization required ⚠️");
      localStorage.clear();
      navigate("/Login");
      return;
    }

    fetchVenues();
  }, [navigate]);

  // ==========================================
  // FETCH ALL VENUES (With Bearer Tokens Fix)
  // ==========================================
  const fetchVenues = async () => {
    try {
      setLoading(true);
      
      // Pass headers config seamlessly so backend auth filters accept the request
      const res = await API.get("/venues", {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      
      setVenues(res.data || []);
    } catch (err) {
      console.error("Error fetching admin platform assets:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session validation expired. Please re-authenticate.");
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ADMINISTRATIVE PURGE ACTION (DELETE)
  // ==========================================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you completely certain you want to delete this venue? This action cannot be reverted. ⚠️")) return;

    try {
      await API.delete(`/venues/${id}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });

      // Optimistically slice record out of current view array state
      setVenues((prevVenues) => prevVenues.filter((v) => v._id !== id));
      alert("Venue successfully wiped from directory register ✅");
    } catch (err) {
      console.error("Deletion lifecycle exception:", err);
      alert(err.response?.data?.message || "Admin delete transaction rejected by server.");
    }
  };

  // ==========================================
  // LOGOUT LIFECYCLE HANDLER
  // ==========================================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-gray-800">
      
      {/* ==========================================
          SIDEBAR CONSOLE (Synced with App.jsx)
         ========================================== */}
      <div className="w-full md:w-72 bg-indigo-950 p-6 flex flex-col justify-between text-white border-r border-indigo-900 min-h-screen">
        <div>
          {/* Admin Identity Card Component */}
          <div className="flex items-center gap-3 border-b border-indigo-800 pb-5 mb-6">
            <div className="bg-indigo-600 p-2.5 rounded-full text-white shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div className="truncate">
              <h1 className="text-lg font-bold tracking-tight truncate">{storedUser?.name || "System Admin"}</h1>
              <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                {storedUser?.role || "Admin"}
              </span>
            </div>
          </div>

          {/* Navigation Action Hub */}
          <div className="space-y-2 flex flex-col w-full">
            <button
              onClick={() => navigate("/AdminDashboard")}
              className="flex items-center gap-3 text-left w-full py-2.5 px-4 bg-indigo-800 rounded-lg font-semibold transition"
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
            </button>

            <button
              onClick={() => navigate("/AdminDetails")}
              className="flex items-center gap-3 text-left w-full py-2.5 px-4 hover:bg-indigo-900/50 text-indigo-200 hover:text-white rounded-lg transition"
            >
              <UserCheck size={18} />
              Profile Details
            </button>

            <button
              onClick={() => navigate("/create-venue")}
              className="flex items-center gap-3 text-left w-full py-2.5 px-4 hover:bg-indigo-900/50 text-green-400 font-bold rounded-lg transition"
            >
              <PlusCircle size={18} />
              Create Venue
            </button>
          </div>
        </div>

        {/* System Escape Anchor */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 font-bold text-left w-full py-2.5 px-4 hover:bg-red-950/40 rounded-lg transition mt-8"
        >
          <LogOut size={18} />
          System Logout
        </button>
      </div>

      {/* ==========================================
          MAIN INTERFACE WORKSPACE WINDOW
         ========================================== */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-4 border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Venues</h1>
            <p className="text-gray-500 text-sm mt-0.5">Global overview control panel for listed platform locations.</p>
          </div>
          
          <button
            onClick={() => navigate("/create-venue")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition flex items-center gap-2 text-sm max-w-max cursor-pointer"
          >
            <PlusCircle size={16} /> Add New Venue
          </button>
        </div>

        {/* LIVE STATE RENDERER CONTROL */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 font-medium">
            Fetching secure cluster database array...
          </div>
        ) : venues.length > 0 ? (
          /* LIVE PROPERTY DATA GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((v) => (
              <div
                key={v._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div>
                  <img
                    src={v.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600"}
                    alt={v.name}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600";
                    }}
                  />

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{v.name}</h2>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <Building2 size={14} className="shrink-0" />
                      <span className="truncate">{v.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-baseline justify-between border-t border-gray-100 pt-3 mt-1">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Pricing Framework</span>
                    <p className="text-lg font-extrabold text-indigo-600">₹{v.pricePerHour || v.price}/hr</p>
                  </div>

                  {/* MASTER ACTIONS PACKAGE */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* EDIT VENUE BUTTON */}
                    <button
                      onClick={() => navigate("/edit-venue", { state: { venue: v } })}
                      className="bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg flex gap-2 items-center justify-center text-sm transition cursor-pointer"
                    >
                      <Pencil size={15} />
                      Edit Profile
                    </button>

                    {/* DELETE PURGE BUTTON */}
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white text-red-600 font-semibold py-2 px-3 rounded-lg flex gap-2 items-center justify-center text-sm transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                      Purge Asset
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-400 font-medium">
            No live venues registered on system platform index.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;