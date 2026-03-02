import React from 'react'
import {MapPin} from "lucide-react"
import { UserRound } from 'lucide-react'

const BookingPage = () => {
  return (
    <>
     
        <div className='border-indigo-950 border-b-6 shadow-lg shadow-indigo-950 h-100 w-80 rounded-xl text-indigo-950 gap-5'>
             <div className='h-2/5 w-full p-2 '>
             <img className="rounded-t-xl object-cover" src="https://plus.unsplash.com/premium_photo-1681487146511-43e0a6382a83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"/>
             
             <div className='h-3/5 w-full'>
               <h3 className='flex'><MapPin size={20}/>3rd floor gran</h3>
             <h2 className='font-bold text-2xl'>Conference hall</h2>
             <h4> Style:Boardroom</h4>
             <h4>4k Display,projector</h4>
             <h3 className='flex text-2xl'><UserRound size={20}/>15</h3>
              <div className='flex gap-10 p-1 font-bold'>
              <button className='border-5 border-amber-50 bg-amber-50 rounded-md w-26 h-10 font-bold'>$120/hour</button>
              <button className='border-5 border-amber-50 bg-amber-50 rounded-md w-25 h-10'>Details</button>
            </div>
            </div>
             </div>
        </div>
      
   
    </>
  )
}

export default BookingPage
