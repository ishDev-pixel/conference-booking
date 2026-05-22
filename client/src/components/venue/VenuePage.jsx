import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import BookingPage from "../../pages/BookingPage"
import API from "../../services/api"

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

  // ✅ STATE
  const [venues, setVenues] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [loading, setLoading] = useState(true);

  // ✅ FETCH VENUES
  useEffect(() => {

    const fetchVenues = async () => {

      try {

        setLoading(true);

        const res = await API.get("/venues");

        console.log("VENUES:", res.data);

        // ✅ BACKEND RETURNS ARRAY
        if (Array.isArray(res.data)) {

          setVenues(res.data);

        }

        // ✅ BACKEND RETURNS OBJECT
        else if (
          res.data &&
          Array.isArray(res.data.venues)
        ) {

          setVenues(res.data.venues);

        }

        // ❌ INVALID RESPONSE
        else {

          setVenues([]);

        }

      } catch (err) {

        console.error("FETCH ERROR:", err);

        setVenues([]);

      } finally {

        setLoading(false);

      }

    };

    fetchVenues();

  }, []);

  // ✅ FILTER VENUES
  const filteredVenues =
    selectedCategory === "All"
      ? venues
      : venues.filter(
          (venue) =>
            venue.category === selectedCategory
        );

  return (

    <div className='min-h-screen w-full bg-white pt-28 px-10 pb-10 flex flex-col gap-8'>

      {/* HEADER */}
      <div className='bg-gray-200 rounded-2xl p-8 flex flex-col gap-2'>

        <h1 className='text-4xl font-bold text-indigo-950'>
          Find Your Perfect Venue
        </h1>

        <p className='text-gray-600 text-lg'>
          Browse premium corporate spaces for meetings,
          events and team gatherings.
        </p>

      </div>

      {/* FILTER SECTION */}
      <div className='bg-gray-100 rounded-2xl p-8'>

        <h2 className='text-2xl font-bold mb-5 text-indigo-950'>
          Venue Type
        </h2>

        {/* CATEGORY BUTTONS */}
        <div className='flex flex-wrap gap-3 mb-8'>

          {categories.map((cat) => (

            <motion.button
              key={cat}
              onClick={() =>
                setSelectedCategory(cat)
              }
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor:
                  selectedCategory === cat
                    ? "#312e81"
                    : "#ffffff",

                color:
                  selectedCategory === cat
                    ? "#ffffff"
                    : "#111827"
              }}
              className='px-5 py-2 rounded-full border font-medium shadow-sm'
            >
              {cat}
            </motion.button>

          ))}

        </div>

        {/* LOADING */}
        {loading && (

          <div className='text-2xl text-gray-500'>
            Loading venues...
          </div>

        )}

        {/* VENUES */}
        {!loading && (

          <div className='flex flex-wrap gap-6'>

            {filteredVenues.length > 0 ? (

              filteredVenues.map((venue) => (

                <BookingPage
                  key={venue._id}
                  venue={venue}
                />

              ))

            ) : (

              <div className='text-2xl text-gray-500 font-medium'>

                No venues found

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  )
}

export default VenuePage