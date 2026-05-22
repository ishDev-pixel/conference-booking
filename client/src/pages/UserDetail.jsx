
import React, { useState } from 'react'
import Navbar from '../layouts/Navbar'

import {
  Mail,
  Pencil,
  Phone,
  Building2,
  UserRound,
  LogOut
} from 'lucide-react'

import { motion } from 'motion/react'

import { useNavigate } from 'react-router-dom'

import API from "../services/api";

const UserDetail = () => {

  const navigate = useNavigate();

  const storedUser =
    JSON.parse(localStorage.getItem("user"));

  // =========================
  // STATES
  // =========================

  const [name, setName] =
    useState(storedUser?.name || "");

  const [email, setEmail] =
    useState(storedUser?.email || "");

  const [phone, setPhone] =
    useState(storedUser?.phone || "");

  const [company, setCompany] =
    useState(storedUser?.company || "");

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleUpdate =
    async () => {

      try {

        const res = await API.put(
          "/auth/profile",
          {
            name,
            email,
            phone,
            company,
          },
          {
            headers: {
              Authorization:
                `Bearer ${storedUser.token}`,
            },
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

        alert("Profile Updated ✅");

      } catch (err) {

        console.error(err);

        alert(
          err.response?.data?.message ||
          "Something went wrong"
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

    <div className='pt-24 bg-blue-100 min-h-screen'>

      <Navbar />

      <div className='flex gap-3 pt-24'>

        {/* SIDEBAR */}

        <div className='h-screen w-80 bg-indigo-500 p-5'>

          <div className='flex gap-3 border-b-2 pb-5'>

            <img
              className='h-20 w-20 rounded-full object-cover'
              src='https://i.pravatar.cc/150'
              alt='profile'
            />

            <div>

              <h2 className='text-3xl text-white font-bold'>
                {storedUser?.name}
              </h2>

              <p className='text-white'>
                {storedUser?.role}
              </p>

            </div>

          </div>

          <div className='text-2xl text-white p-3 leading-[2]'>

            <h3
              className='cursor-pointer'
              onClick={() =>
                navigate("/UserDashboard")
              }
            >
              Dashboard
            </h3>

            <h3
              className='cursor-pointer'
              onClick={() =>
                navigate("/my-booking-page")
              }
            >
              My Bookings
            </h3>

            <h3 className='cursor-pointer'>
              Profile
            </h3>

            <h3
              onClick={handleLogout}
              className='flex gap-3 cursor-pointer text-red-200'
            >
              <LogOut />
              Logout
            </h3>

          </div>

        </div>

        {/* MAIN */}

        <div className='flex gap-5 p-5'>

          {/* PROFILE CARD */}

          <div className='bg-white shadow-md w-[550px] rounded-2xl p-6'>

            <motion.h1
              className='text-4xl text-indigo-950 flex'
            >

              User Profile

              <motion.div
                className='ml-auto'
                whileHover={{ scale: 1.2 }}
              >
                <Pencil size={20} />
              </motion.div>

            </motion.h1>

            <div className='mt-8 flex gap-5'>

              <img
                className='h-36 w-36 rounded-2xl object-cover'
                src='https://i.pravatar.cc/200'
                alt='profile'
              />

              <div className='space-y-3 text-indigo-950'>

                <h2 className='text-3xl font-bold'>
                  {name}
                </h2>

                <p className='flex gap-3'>
                  <UserRound size={20}/>
                  {name}
                </p>

                <p className='flex gap-3'>
                  <Mail size={20}/>
                  {email}
                </p>

                <p className='flex gap-3'>
                  <Phone size={20}/>
                  {phone || "No phone"}
                </p>

                <p className='flex gap-3'>
                  <Building2 size={20}/>
                  {company || "No company"}
                </p>

              </div>

            </div>

          </div>

          {/* EDIT FORM */}

          <div className='bg-white shadow-md rounded-2xl w-[400px] p-6'>

            <h2 className='text-3xl text-indigo-950 mb-5'>
              Edit Profile
            </h2>

            <div className='flex flex-col gap-4'>

              <input
                className='border-2 border-indigo-300 rounded-xl p-3'
                type='text'
                placeholder='Full Name'
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className='border-2 border-indigo-300 rounded-xl p-3'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                className='border-2 border-indigo-300 rounded-xl p-3'
                type='text'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              <input
                className='border-2 border-indigo-300 rounded-xl p-3'
                type='text'
                placeholder='Company Name'
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
              />

              <button
                onClick={handleUpdate}
                className='bg-indigo-950 text-white py-3 rounded-xl mt-3'
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default UserDetail