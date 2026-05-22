import React, {
  useState,
  useRef,
  useEffect
} from "react";

import { motion } from "motion/react";

import {
  Menu,
  LayoutDashboard,
  User,
  Settings,
  LogOut
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  // =========================
  // MENU STATE
  // =========================

  const [menuOpen, setMenuOpen] =
    useState(false);

  // =========================
  // REF
  // =========================

  const menuRef = useRef();

  // =========================
  // USER
  // =========================

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // =========================
  // CLOSE MENU OUTSIDE CLICK
  // =========================

  useEffect(() => {

    const handleClickOutside =
      (e) => {

        if (
          menuRef.current &&
          !menuRef.current.contains(
            e.target
          )
        ) {

          setMenuOpen(false);

        }

      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.clear();

    setMenuOpen(false);

    navigate("/login");

  };



  // =========================
// DASHBOARD NAVIGATION
// =========================

const goToDashboard = () => {

  if (user?.role === "admin") {

    navigate("/AdminDashboard");

  } else if (user?.role === "owner") {

    navigate("/owner");

  } else {

    navigate("/Userdashboard");

  }

  setMenuOpen(false);

};

// =========================
// PROFILE NAVIGATION
// =========================

const goToProfile = () => {

  if (user?.role === "admin") {

    navigate("/AdminDetails");

  } else if (user?.role === "owner") {

    navigate("/ownerProfile");

  } else {

    navigate("/UserDetail");

  }

  setMenuOpen(false);

};

  return (

    <div className="h-22 w-full fixed top-0 left-0 z-50 bg-white shadow-lg flex items-center justify-between px-6">

      {/* LOGO */}

      <div className="flex items-center gap-2">

        <img
          className="h-15 w-16 object-cover"
          src="/logo.png"
          alt="logo"
        />

        <h1 className="text-4xl font-bold text-indigo-950">
          ConfyBook
        </h1>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-8 text-indigo-950">

        {/* HOME */}

        <Link to="/">

          <motion.h3
            className="text-xl font-bold cursor-pointer"
            whileHover={{
              color: "blue"
            }}
          >
            Home
          </motion.h3>

        </Link>

        {/* VENUES */}

        <Link to="/VenuePage">

          <motion.h3
            className="text-xl font-bold cursor-pointer"
            whileHover={{
              color: "blue"
            }}
          >
            Venues
          </motion.h3>

        </Link>

        {/* ABOUT */}

        <Link to="/About">

          <motion.h3
            className="text-xl font-bold cursor-pointer"
            whileHover={{
              color: "blue"
            }}
          >
            About
          </motion.h3>

        </Link>

        {/* LOGIN */}

        {!user ? (

          <Link to="/Login">

            <motion.button
              className="text-xl font-bold cursor-pointer"
              whileHover={{
                color: "blue",
                scale: 1.05
              }}
            >
              Login
            </motion.button>

          </Link>

        ) : (

          <div
            className="relative"
            ref={menuRef}
          >

            {/* MENU BUTTON */}

            <motion.button
              className="cursor-pointer"
              whileHover={{
                scale: 1.1
              }}
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
            >

              <Menu
                size={34}
                className="text-indigo-950"
              />

            </motion.button>

            {/* DROPDOWN */}

            {menuOpen && (

              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

                {/* USER INFO */}

                <div className="p-4 border-b bg-gray-50">

                  <h2 className="font-bold text-lg text-indigo-950">
                    {user?.name}
                  </h2>

                  <p className="text-gray-500 text-sm break-all">
                    {user?.email}
                  </p>

                  <p className="text-indigo-700 text-sm mt-1 capitalize">
                    {user?.role}
                  </p>

                </div>

                {/* MENU ITEMS */}

                <div className="flex flex-col">

                  {/* DASHBOARD */}

                  <button
                    onClick={
                      goToDashboard
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                  >

                    <LayoutDashboard size={18} />

                    Dashboard

                  </button>

                  {/* PROFILE */}

                  <button
                    onClick={
                      goToProfile
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                  >

                    <User size={18} />

                    Profile

                  </button>

                  {/* SETTINGS */}

                  <button
                    onClick={() => {

                      setMenuOpen(false);

                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                  >

                    <Settings size={18} />

                    Settings

                  </button>

                  {/* LOGOUT */}

                  <button
                    onClick={
                      handleLogout
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-600 transition text-left"
                  >

                    <LogOut size={18} />

                    Logout

                  </button>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

};

export default Navbar;