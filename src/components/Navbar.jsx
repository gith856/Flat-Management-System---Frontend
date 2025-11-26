import React, { useState } from "react";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/60 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => goTo("/")}
          className="text-8xl font-extrabold text-slate-900 cursor-pointer"
        >
          Flat<span className="text-amber-400">Mgmt</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => goTo("/")}
            className="text-slate-700 hover:text-slate-900"
          >
            Home
          </button>
          <button
            onClick={() => goTo("/features")}
            className="text-slate-700 hover:text-slate-900"
          >
            Features
          </button>
          <button
            onClick={() => goTo("/contact")}
            className="text-slate-700 hover:text-slate-900"
          >
            Contact
          </button>
          <button
            onClick={() => goTo("/login")}
            className="px-4 py-2 bg-amber-400 rounded-lg text-slate-900 font-semibold hover:bg-amber-500 transition"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <HiOutlineBars3 size={30} className="text-slate-900" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: 250 }}
            animate={{ x: 0 }}
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-around items-center mb-4 mt-4">
              <div className="text-xl font-bold text-slate-900 ">
                Flat<span className="text-amber-400">Mgmt</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <HiXMark size={32} className="text-slate-800" />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-slate-800 bg-white">
              <button onClick={() => goTo("/")}>
                Home
              </button>
              <button onClick={() => goTo("/features")}>
                Features
              </button>
              <button onClick={() => goTo("/contact")}>
                Contact
              </button>
              <button
                onClick={() => goTo("/login")}
                className=" m-auto mb-4 px-4 py-2 w-30 text-center bg-amber-400 rounded-lg text-slate-900 font-semibold hover:bg-amber-500 transition"
              >
                Login
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </nav>
  );
}
