import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from "../services/api";

const PaymentPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;

  const handlePayment = async () => {
    try {

      if (!bookingId) {
        alert("Invalid booking");
        return;
      }

      const res = await API.post("/payments", {
        bookingId
      });

      console.log(res.data);
      alert("Payment Successful 🎉");

      // ✅ go to dashboard or bookings
      navigate("/my-booking-page");

    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
    }
  };

  return (
    <div className="pt-24 h-screen flex items-center justify-center">
      <div className="shadow-xl p-10 rounded-xl bg-white flex flex-col gap-5">

        <h1 className="text-3xl font-bold">Complete Payment</h1>

        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Pay Now
        </button>

      </div>
    </div>
  )
}

export default PaymentPage;