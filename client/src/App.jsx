
import { Route,Routes } from 'react-router-dom'

import LandingPage from './layouts/LandingPage'
import About from './layouts/About'
import Navbar from './layouts/Navbar'
import VenuePage from './components/venue/VenuePage'
import VenueContext from './components/venue/VenueContext'
import VenueDetailPage from './components/venue/VenueDetailPage'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
 


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

        <Route path='/VenueContext' element={<VenueContext/>}/>
        <Route path='/VenueDetailPage' element={<VenueDetailPage/>}/>
      
        <Route path='*' element={< NotFound/>}/>
      </Routes>
      
    </div>
  )
}

export default App

