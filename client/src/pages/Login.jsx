import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

import { Link } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const navigate = useNavigate();

  const HandleLogin = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      // STORE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      // ROLE
      const role = res.data.role;

      if (role === "admin") {

  navigate("/AdminDashboard");

} else if (role === "owner") {

  navigate("/owner");

} else {

  navigate("/UserDashboard");

}

    } catch (err) {

      console.log(
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        "Login failed ❌"
      );

    }

  };

  return (

    <div className='bg-gray-50 h-screen w-screen flex flex-col items-center justify-center'>

      <div className='h-100 w-150 bg-white shadow-xl shadow-gray-300 rounded flex flex-col gap-5'>

        <div className='py-5 space-y-1'>

          <h1 className='text-3xl font-bold text-center'>
            Welcome Back!
          </h1>

          <p className='text-center'>

            Dont have an Account?

            <Link
              to={'/Register'}
              className='text-blue-600 ml-1'
            >
              Sign Up
            </Link>

          </p>

        </div>

        <div className='flex flex-col items-center justify-center gap-5'>

          <div className='flex flex-col'>

            <input
              className='border-black border-2 h-10 w-80 px-3 rounded'
              type='email'
              onChange={(e) =>
                setEmail(e.target.value)
              }
              value={email}
              placeholder='Enter email'
            />

            <br />

            <input
              className='border-black border-2 h-10 w-80 px-3 rounded'
              type='password'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder='Enter password'
            />

          </div>

          <button
            onClick={HandleLogin}
            className='h-13 w-30 rounded bg-blue-950 text-white active:scale-95 font-bold cursor-pointer text-xl'
          >
            Login
          </button>

        </div>

        <div className='flex gap-7 items-center justify-center text-2xl'>

          <h2>Google</h2>

          <h2>Email</h2>

          <h2>Number</h2>

        </div>

      </div>

    </div>

  )

}

export default Login