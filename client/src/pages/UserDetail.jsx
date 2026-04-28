import React from 'react'
import Navbar from '../layouts/Navbar'
import {Mail, Pencil} from 'lucide-react'
import { Phone } from 'lucide-react'
import { Building2 } from 'lucide-react'
import { UserRound } from 'lucide-react'
import { motion } from 'motion/react'
import { LogOut } from 'lucide-react'


const UserDetail = () => {
  return (
    
    <> <div className='bg-blue-100'>
     <Navbar/>
    
         <div className='flex gap-2'>
        <div className='h-screen w-80 bg-indigo-500'>
          <div className='flex p-5 gap-3  border-b-2'> 
            <img className='h-20 w-20 rounded-full object-cover' src='https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'/>
            <h2 className='text-4xl text-indigo-950'>Alex Johnson</h2>
          </div>
          <div className='text-4xl text-indigo-950 p-3 leading-[1.3]'>
          <h3 className='flex gap-3'>Dashboard</h3>
          <h3 className='flex gap-3'>My Bookings</h3>
          <h3 className='flex gap-3'>Profile</h3>
          <h3 className='flex gap-3 '><LogOut size={50}/>Logout</h3>
          </div>
        </div>



         <div className='flex gap-2'>

        <div className='p-4'>
    <div className='bg-white shadow-md shadow-white h-60 w-130 rounded-md'>
        <motion.h1 className='text-4xl text-indigo-950 p-2 flex'>User Profile <motion.div className='ml-auto flex text-xl' whileHover={{scale:1.2}}><Pencil size={20} /> </motion.div> </motion.h1>
         <div className='ml-5'>
        <div className=' h-30 w-90 p-2 flex gap-5  bg-white  rounded-2xl'>
        <img className="h-35 w-35 object-cover rounded-xl " src='https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' />
        <div className='text-2l text-indigo-950 '>
        <h2 className='text-3xl  '>Alex Jackson</h2>
        <h3 className='flex gap-3'><UserRound size={20} />Name</h3>
        <p className='flex gap-3'><Mail size={20} />email</p>
        <p className='flex gap-3'><Phone size={20} />1234567890</p>
        <p className='flex gap-3'><Building2 size={20} />Company Name</p>
        </div>
        </div>
        </div>
        </div>


        </div>
        
             



         <div className='p-4'>
        <div className='h-60 w-80 bg-white shadow-md shadow-white rounded-md'>
          <form className=' p-2  flex flex-col space-y-3'>
            <input className='border-2 border-indigo-950 rounded-md' type="name" placeholder='Enter Full Name'/>
            <input className='border-2 border-indigo-950 rounded-md' type="email" placeholder='Enter valid email'/>
            <input className='border-2 border-indigo-950 rounded-md' type='number' placeholder='Enter valid Number'/>
            <input className='border-2 border-indigo-950 rounded-md' type="text" placeholder='enter company name'/>
            </form>
            <button className='border-2 border-indigo-950 rounded-md ml-54'>save changes</button>
          </div>
          
         </div>
         
           
           </div>  
         
        
     </div>
      
      
      
      </div>
    </>
  )
}

export default UserDetail
