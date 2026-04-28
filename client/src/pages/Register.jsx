import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => { 

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const HandleLogin = () => {
    let role;

    if (email === "posgeishrat@gmail.com") {
      role = "admin";
    } else {
      role = "user";
    }

    // store user
    localStorage.setItem(
      "user",
      JSON.stringify({ email, password, role })
    );

    // redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className='bg-gray-50 h-screen w-screen flex flex-col items-center justify-center'>
      <div className='h-100 w-150 bg-white shadow-xl shadow-gray-300 rounded flex flex-col gap-5'>
        <div className='py-5 space-y-1 '>
          <h1 className='text-3xl font-bold text-center'>Welcome !</h1>
          <p className='text-center'>Already have an Account? Signin</p>
        </div>

        <div className='flex flex-col items-center justify-center gap-5'>
          <div className='flex flex-col '>
            <input
              className='border-black border-2 h-10 w-80 '
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Enter email'
            /><br />

            <input
              className='border-black border-2 h-10 w-80'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
            />
          </div>

          <button
            onClick={HandleLogin}
            className='h-13 w-25 rounded bg-blue-950 text-white active:scale-95 font-bold cursor-pointer text-xl'
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

export default Register