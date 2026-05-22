import React, { useEffect, useState } from 'react'
import API from "../services/api";

const MyBookingsPage = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="pt-24 p-10 min-h-screen bg-gray-50">

      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="bg-white shadow p-5 mb-4 rounded-xl">

            <h2 className="text-xl font-bold">{b.venue?.name}</h2>

            <p>Date: {new Date(b.date).toLocaleDateString()}</p>

            <p>Time: {b.startTime} - {b.endTime}</p>

            <p>
              Status: 
              <span className={`ml-2 font-bold ${
                b.status === "confirmed" ? "text-green-600" :
                b.status === "cancelled" ? "text-red-600" :
                "text-yellow-600"
              }`}>
                {b.status}
              </span>
            </p>

            <p>
              Payment: 
              <span className={`ml-2 font-bold ${
                b.paymentStatus === "paid" ? "text-green-600" :
                "text-yellow-600"
              }`}>
                {b.paymentStatus}
              </span>
            </p>

          </div>
        ))
      )}

    </div>
  )
}

export default MyBookingsPage;