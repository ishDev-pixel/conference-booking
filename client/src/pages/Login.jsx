import React from 'react'

const Login = () => {
  return (
    <> 
    <div className='h-120 w-100 white bg-indigo-950 shadow-lg shadow-white text-white font-bold' >
      <div className='justify-center items-centerp-10 gap-5'>
         <h2>Login</h2>
        <h5>Please login to access your Account</h5>
      </div>

      <div className=' flex flex-col-reverse rounded-xl justify-center items-center p-10 gap-10'>
         <input type="email" className="border p-5 rounded w-4/4 text-1xl font-bold" placeholder="Enter your email"/>

        <input type="password" className="border p-5 rounded w-4/4 text-1xl " placeholder="Enter your Password"/>
      </div>
        <div className='flex gap-5 p-5'>
          <h3>New To MeetNest?</h3>
          <button>Login</button>
        </div>
      
    </div>
    </>
  )
}

export default Login
