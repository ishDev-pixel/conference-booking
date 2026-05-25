

import { Route,Routes } from 'react-router-dom'

import LandingPage from './layouts/LandingPage'
import About from './layouts/About'
import Navbar from './layouts/Navbar'
import BookingPage from './pages/BookingPage'
import VenuePage from './components/venue/VenuePage'

import VenueDetailPage from './components/venue/VenueDetailPage'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PaymentPage from './pages/PaymentPage'
import MyBookingsPage from './pages/MyBookingPage'
import UserDashboard from './pages/UserDashboard'
import UserDetail from './pages/UserDetail'
import OwnerDashboard from './pages/OwnerDashboard'
import AdminDetails from './pages/AdminDetails'
import AdminDashboard from './pages/AdminDashboard'
import OwnerDetails from './pages/OwnerDetails'
 import CreateVenuePage from './pages/CreateVenuePage'

 import EditVenue from './pages/EditVenue'


const App = () => {
  
     
  return (
    <div>
    <Navbar/>
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/VenuePage' element={<VenuePage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>} />
        <Route path='BookingPage' element={<BookingPage/>}/>

        <Route path='/VenueDetailPage' element={<VenueDetailPage/>}/>
        <Route path="/my-booking-page" element={<MyBookingsPage />} />
         <Route path="/UserDashboard" element={<UserDashboard />} />
         <Route path="/UserDetail" element={<UserDetail/>} />
         <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/ownerProfile" element={<OwnerDetails/>} />
          <Route path="/create-venue" element={<CreateVenuePage />} />
          <Route path="/edit-venue"   element={<EditVenue />}/>
          <Route path='/AdminDetails' element={<AdminDetails/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/payment'  element={<PaymentPage/>}/>

      
        <Route path='*' element={< NotFound/>}/>
      </Routes>
      
    </div>
  )
}

export default App
