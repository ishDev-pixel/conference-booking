import React, { useEffect, useState } from 'react'
import { LogOut, Bookmark, Clock7, Building2, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {

  const navigate = useNavigate();

  // 🔒 PROTECT USER PAGE
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // 🔁 BACKEND: validate token/session later

    if (!user) {
      navigate("/login");
    }
  }, []);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");

    // 🔁 BACKEND
    /*
    await axios.post("/logout");
    */

    navigate("/login");
  };

  // 📦 BOOKINGS STATE
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    
    // 🔁 BACKEND
    /*
    const res = await axios.get("/bookings");
    setBookings(res.data);
    */

    setBookings(data);
  }, []);

  return (
    <div className='bg-white w-screen'>

      <div className='flex gap-5'>

        {/* SIDEBAR */}
        <div className='bg-gray-200 w-100 p-4'>
          <div className='flex p-2 border-b-2 border-b-gray-700 gap-2'>
            <img className='h-20 w-20 rounded-full' src='https://plus.unsplash.com/premium_photo-1738637233381-6f857ce13eb9?w=600'/>
            <div className='p-3'>
              <h1 className='text-3xl'>User</h1>
              <p>Dashboard</p>
            </div>
          </div>

          <div className='text-3xl text-indigo-950 p-3 space-y-2'>
            <h3>Dashboard</h3>
            <h3>My Bookings</h3>
            <h3>Profile</h3>

            <h3 onClick={handleLogout} className='flex gap-3 cursor-pointer'>
              <LogOut size={50}/>Logout
            </h3>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className='flex flex-col'>

          {/* TABLE */}
          <div className='bg-gray-200 w-280 rounded-md'>
            <h1 className='p-2 text-indigo-950 font-bold text-2xl'>Recent Booking</h1>

            <table className='table-fixed border-collapse w-280 text-indigo-950'>
              <thead>
                <tr className='border-2 h-10 text-left'>
                  <th className='p-2'>Customer</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b, index) => (
                    <tr key={index} className='border-b h-15'>
                      <td className='p-2'>{b.userEmail}</td>
                      <td>{b.date}</td>
                      <td>{b.venueName}</td>
                      <td>
                        <button className='border border-indigo-400 px-2'>
                          Booked
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className='p-4'>No bookings yet</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UserDashboard