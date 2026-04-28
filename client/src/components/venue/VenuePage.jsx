
import { motion } from 'motion/react'
import { useState } from 'react';
import BookingPage from "../../pages/BookingPage";




const VenuePage = () => {

  const categories = [
    "All",
    "Conference",
    "Meeting",
    "Event Hall",
    "Workshop",
    "Training",
    "Boardroom",
    "Executive",
    "Outdoor"
  ];

 const venues = [
  {
    name: "Skyline Conference Center",
    category: "Conference",
    location: "Midtown",
    style: "Boardroom",
    features: "4K Display, Projector",
    capacity: 15,
    price: "$120/hour",
    image: "https://plus.unsplash.com/premium_photo-1681487146511-43e0a6382a83?w=600"
  },
  {
    name: "City Meeting Room",
    category: "Meeting",
    location: "Downtown",
    style: "Discussion",
    features: "TV, Whiteboard",
    capacity: 10,
    price: "$80/hour",
    image: "https://images.unsplash.com/photo-1596079890701-dd42edf0b7c8?w=600"
  },
  {
    name: "Grand Event Hall",
    category: "Event Hall",
    location: "Central",
    style: "Executive",
    features: "Stage, Lighting",
    capacity: 50,
    price: "$200/hour",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600"
  },
    {
    name: "Skyline Conference Center",
    category: "Conference",
    location: "Midtown",
    style: "Boardroom",
    features: "4K Display, Projector",
    capacity: 15,
    price: "$120/hour",
    image: "https://plus.unsplash.com/premium_photo-1681487146511-43e0a6382a83?w=600"
  },
    {
    name: "Skyline Conference Center",
    category: "Conference",
    location: "Midtown",
    style: "Boardroom",
    features: "4K Display, Projector",
    capacity: 15,
    price: "$120/hour",
    image: "https://plus.unsplash.com/premium_photo-1681487146511-43e0a6382a83?w=600"
  },
    {
    name: "Skyline Conference Center",
    category: "Conference",
    location: "Midtown",
    style: "Boardroom",
    features: "4K Display, Projector",
    capacity: 15,
    price: "$120/hour",
    image: "https://plus.unsplash.com/premium_photo-1681487146511-43e0a6382a83?w=600"
  }
];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVenues =
    selectedCategory === "All"
      ? venues
      : venues.filter(
          venue => venue.category === selectedCategory
        );

  return (
    <div className='h-screen w-screen  bg-white flex flex-col gap-8 px-10 py-10 pt-24'>
       <div className='bg-gray-200 h-30  px-10 py-5 flex flex-col gap-2 rounded-2xl w-full'>
        <h1 className='text-4xl font-bold '> Find Your Perfect Venue</h1>
        <p className='text-gray-500 text-xl'>Browse premium corporate spaces for meetings, events, and team gatherings.</p>
          </div> 


           <div className="p-10 bg-gray-200  rounded-2xl ">

      {/* Venue Type Section */}
      <h2 className="text-xl font-semibold mb-4">
        Venue Type
      </h2>

      <div className="flex gap-3 flex-wrap mb-6">

        {categories.map((cat) => (

          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            animate={{
              backgroundColor:
                selectedCategory === cat
                  ? "#2563eb"
                  : "#f3f4f6",
              color:
                selectedCategory === cat
                  ? "white"
                  : "black"
            }}
            className="px-4 py-2 rounded-full border"
          >
            {cat}
          </motion.button>

        ))}

      </div>

      {/* Venue Cards */}
     <div className="flex gap-6 flex-wrap">

  {filteredVenues.map((venue, index) => (

    <BookingPage
      key={index}
      venue={venue}
    />

  ))}

</div>


      </div>

    </div>
      
  
    
  )
}

export default VenuePage
