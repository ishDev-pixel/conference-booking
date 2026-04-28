import React from 'react'
import logo from '../assets/logo.png'
import {motion} from 'motion/react'
import { Menu} from 'lucide-react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
    <div className='h-22  w-screen flex fixed bg-white shadow-lg'>
      <div className='flex itewms-center p-4'>
      <img className="m-0 h-15 w-16" src={logo} alt="logo"/>
        <h1 className='text-5xl font-bold text-indigo-950'>ConfyBook</h1>
      </div>

       
        <div className='flex items-center  text-indigo-950 gap-10 p-8 ml-140 cursor-pointer '>
         <Link to={'/'}>
          <motion.h3 className='r text-2xl font-bold  text-indigo-950'
          whileHover={{color:'blue'}}>Home  </motion.h3>
            
              </Link>
          <Link to={'/VenuePage'}>
          <motion.h3 className='flex justify-center items-center  text-2xl font-bold  text-indigo-950'
           whileHover={{color:'blue'}}>Venues  </motion.h3>
           </Link>
        
            <Link to={'/About'}>
          <motion.h3 className='text-2xl font-bold  text-indigo-950'
           whileHover={{color:'blue'}}>About Us</motion.h3>
             </Link>


             <Link to={'/Login'}>
          <motion.button className=' text-2xl text-indigo-950 font-bold '
          whileHover={{color:'blue',scale:1.1}}>  Login  </motion.button>
                  </Link>


          <motion.div whileHover={{scale:1.1}} ><Menu size={35}/></motion.div>
        </div>
      <h1></h1>
    </div>
    </>
  )
}

export default Navbar
