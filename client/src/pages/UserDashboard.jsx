import React, { useEffect, useState } from 'react'
import {
  LogOut,
  Bookmark,
  Clock7,
  Building2,
  TrendingUp
} from 'lucide-react'

import { useNavigate } from "react-router-dom";
import API from "../services/api";

const UserDashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);

  // ✅ FETCH BOOKINGS
  useEffect(() => {

    const fetchBookings = async () => {

      try {

       const token = JSON.parse(localStorage.getItem("user"))?.token;

        const res = await API.get(
          "/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchBookings();

  }, []);

  // ✅ CALCULATIONS
  const totalBookings = bookings.length;

  const totalHours = bookings.reduce((acc, b) => {

    return acc + (
      parseInt(b.endTime) - parseInt(b.startTime)
    );

  }, 0);

  const totalSpend = bookings.reduce((acc, b) => {

    return acc + (b.totalPrice || 0);

  }, 0);

  const handleLogout = () => {

  localStorage.clear();

  navigate("/login");

};

  return (

    <div className='pt-24 bg-white w-screen min-h-screen'>

      <div className='flex'>

        {/* SIDEBAR */}
        <div className='bg-gray-200 w-80 p-4'>

          <div className='flex p-2 border-b-2 border-gray-400 gap-2'>

            <img
              className='h-16 w-16 rounded-full'
              src='https://i.pravatar.cc/150'
              alt="user"
            />

            <div>
              <h1 className='text-xl font-bold'>
                {user?.name}
              </h1>

              <p>{user?.role}</p>
            </div>

          </div>

          <div className='text-xl text-indigo-950 mt-5 space-y-3'>

            <h3
              onClick={() => navigate("/UserDashboard")}
              className='cursor-pointer'
            >
              Dashboard
            </h3>

            <h3
              onClick={() => navigate("/my-booking-page")}
              className='cursor-pointer'
            >
              My Bookings
            </h3>

            <h3 className='cursor-pointer'
             onClick={() => navigate("/UserDetail")}>
              Profile
            </h3>

            <button
               onClick={handleLogout}
            >
              <LogOut />
              Logout
            </button>

          </div>

        </div>

        {/* MAIN */}
        <div className='bg-gray-100 w-full p-6'>

          <h1 className='text-3xl font-bold mb-2'>
            Welcome back, {user?.name}
          </h1>

          <p className='text-gray-600 mb-6'>
            Here's your booking activity.
          </p>

          {/* STATS */}
          <div className='flex gap-5 flex-wrap'>

            <div className='h-32 w-60 bg-white rounded-xl p-4 shadow'>

              <h1 className='flex'>
                Total Bookings

                <span className='ml-auto'>
                  <Bookmark/>
                </span>
              </h1>

              <h2 className='text-3xl font-bold'>
                {totalBookings}
              </h2>

            </div>

            <div className='h-32 w-60 bg-white rounded-xl p-4 shadow'>

              <h1 className='flex'>
                Venues Used

                <span className='ml-auto'>
                  <Building2/>
                </span>
              </h1>

              <h2 className='text-3xl font-bold'>
                {totalBookings}
              </h2>

            </div>

            <div className='h-32 w-60 bg-white rounded-xl p-4 shadow'>

              <h1 className='flex'>
                Hours Booked

                <span className='ml-auto'>
                  <Clock7/>
                </span>
              </h1>

              <h2 className='text-3xl font-bold'>
                {totalHours}
              </h2>

            </div>

            <div className='h-32 w-60 bg-white rounded-xl p-4 shadow'>

              <h1 className='flex'>
                Total Spend

                <span className='ml-auto'>
                  <TrendingUp/>
                </span>
              </h1>

              <h2 className='text-3xl font-bold'>
                ₹{totalSpend}
              </h2>

            </div>

          </div>

          {/* ✅ BOOKINGS TABLE */}

          <div className='bg-white rounded-xl shadow mt-10 p-5'>

            <h2 className='text-2xl font-bold mb-5'>
              Recent Bookings
            </h2>

            {bookings.length === 0 ? (

              <p>No bookings found</p>

            ) : (

              <table className='w-full text-left'>

                <thead>

                  <tr className='border-b h-12'>

                    <th>Venue</th>

                    <th>Date</th>

                    <th>Time</th>

                    <th>Seats</th>

                  </tr>

                </thead>

                <tbody>

                  {bookings.map((b) => (

                    <tr
                      key={b._id}
                      className='border-b h-14'
                    >

                      <td>
                        {b.venue?.name}
                      </td>

                      <td>
                        {b.date}
                      </td>

                      <td>
                        {b.startTime}:00 - {b.endTime}:00
                      </td>

                      <td>
                        {b.seats}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>

  )
}

export default UserDashboard;