import React from 'react'
import { LogOut,Bookmark,Clock7,Building2,TrendingUp } from 'lucide-react'


const UserDashboard = () => {
  return (
    <div className='bg-white w-screen' >
      <div className='flex gap-5'>
       <div className='bg-gray-200  w-100 p-4'>
          <div className='flex p-2 border-b-2 border-b-gray-700 gap-2 '>
           <img  className='h-20 w-20 rounded-full' src='https://plus.unsplash.com/premium_photo-1738637233381-6f857ce13eb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbiUyMHVzZXIlMjBwcm9maWx8ZW58MHx8MHx8fDA%3D'/>
           <div className='p-3 '>
           <h1 className='text-3xl'> ALexa Johnson</h1>
           <p>Owner</p>
           </div>
          </div>
            <div className='text-3xl text-indigo-950 p-3 leading-[1.3] space-y-2'>
                     <h3 className='flex gap-3'>Dashboard</h3>
                     <h3 className='flex gap-3'>My Venues</h3>
                     <h3 className='flex gap-3'>Profile</h3>
                     <h3 className='flex gap-3 '><LogOut size={50}/>Logout</h3>
                     </div>
         
        </div>

        <div className=' bg-gray-200 w-full'>       
        <div className='p-5'>
      <h1 className='text-4xl'> Welcome Back, Jane</h1>
      <h3>Here's an overview of your venue bookings and activity.</h3>
      </div>
      <div className='flex flex-col  gap-10'>

      <div className='  flex gap-5 justify-center items-center'>
        <div className='h-40 w-60 bg-white rounded-xl '>
          <h1 className='text-2xl p-3 flex'>Total Bookings<span className='ml-auto p-1'>< Bookmark/></span></h1>
          <h2 className='font-bold text-4xl p-4'c>128</h2>
          <p></p>
        </div>
        <div className='h-40 w-60 bg-white rounded-xl '>
          <h1 className='text-2xl p-3 flex' >Venues used <span  className='ml-auto p-1'><Building2/></span></h1>
          <h2 className='font-bold text-4xl p-4'>14</h2>
        </div>
        <div className='h-40 w-60 bg-white rounded-xl '>
          <h1 className='text-2xl p-3 flex'>Hours Booked <span className='ml-auto p-1'><Clock7/></span></h1>
          <h2 className='font-bold text-4xl p-4'>234</h2>
        </div>
        <div className='h-40 w-60 bg-white rounded-xl '>
          <h1 className='text-2xl p-3 flex'>Monthly Spend<span className='ml-auto p-1'><TrendingUp/></span></h1>
          <h2 className='font-bold text-4xl p-4'>1200</h2>
        </div>
      </div>



         
        
      
      </div>
    </div>
    
      
      </div>
    </div>
  )
}

export default UserDashboard
