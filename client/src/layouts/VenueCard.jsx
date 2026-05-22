import React from 'react'

const VenueCard = ({ venue }) => {
  return (
    <div className='bg-white rounded-xl shadow p-3'>

      <img
        src={venue.image}
        className='h-70 w-full object-cover rounded'
      />

      <h2 className='text-xl font-bold mt-2'>
        {venue.name}
      </h2>

      <p>{venue.location}</p>

      <p className='font-semibold'>
        ₹{venue.pricePerHour}
      </p>

    </div>
  )
}

export default VenueCard