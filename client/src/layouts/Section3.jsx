
import React, { useEffect, useState } from 'react'
import API from "../services/api";
import VenueCard from './VenueCard';

const Section3 = () => {

  const [venues, setVenues] = useState([]);

  useEffect(() => {

    const fetchVenues = async () => {

      try {

        const res = await API.get("/venues");

        setVenues(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchVenues();

  }, []);

  return (

    <div className='h-screen w-screen px-50 py-10'>
         
      <div className='h-100 w-280 bg-gradient-to-b from-gray-300 to-white rounded-2xl p-10'>

        <div className='text-center mb-10'>

          <h1 className='text-5xl'>
            Host Seamless Conferences with ConfyBook
          </h1>

          <h2 className='text-2xl mt-4'>
            Enhance collaboration and planning
          </h2>

        </div>

        <div className='grid grid-cols-3 gap-5'>

          {venues.slice(0,3).map((venue) => (

            <VenueCard
              key={venue._id}
              venue={venue}
            />

          ))}

        </div>

      </div>
      

    </div>

  )
}

export default Section3