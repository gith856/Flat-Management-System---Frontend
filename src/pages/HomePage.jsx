
import { motion } from "framer-motion";
import { ArrowRight, Home, Building2, ShieldCheck, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

export default function Homepage() {
    const navigate = useNavigate();

    // HERO CAROUSEL DATA
    const heroSlides = [
        {
            id: 1,
            title: "Find Your Perfect Flat Easily",
            subtitle: "Search, compare and manage flats with a single platform.",
            img: "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo=",
        },
        {
            id: 2,
            title: "Manage Your Properties Effortlessly",
            subtitle: "A complete system to manage, approve and track your flats.",
            img: "https://www.openhousedesigns.com/wp-content/uploads/2023/08/Modern-House-1-1024x576.jpg",
        },
        {
            id: 3,
            title: "Fast Approvals & Smooth Enquiries",
            subtitle: "Experience a seamless workflow for property approvals and enquiries.",
            img: "https://i.pinimg.com/736x/c4/ee/a4/c4eea4906647b7c01cc0e9f98862f9ce.jpg",
        },
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    const featureCards = [
        {
            title: "List Your Flat",
            desc: "Add and manage your flats with detailed amenities and pricing.",
            icon: <Home size={32} />,
        },
        {
            title: "Flat Approvals",
            desc: "Submit flats for admin approval with quick updates.",
            icon: <ShieldCheck size={32} />,
        },
        {
            title: "Enquiry System",
            desc: "Users can send enquiries and receive updates instantly.",
            icon: <PhoneCall size={32} />,
        },
        {
            title: "Track Sold Flats",
            desc: "Monitor which flats are sold with complete details.",
            icon: <Building2 size={32} />,
        },
        {
            title: "Admin Dashboard",
            desc: "All approvals, sales, and enquiries in one place.",
            icon: <ShieldCheck size={32} />,
        },
        {
            title: "User Dashboard",
            desc: "Manage all your flat listings and enquiries easily.",
            icon: <Home size={32} />,
        },
    ];

    const [showAll, setShowAll] = useState(false);

    function ContactForm() {
        const nameRef = useRef();
        const emailRef = useRef();
        const msgRef = useRef();


        const submit = (e) => {
            e.preventDefault();
            alert(`Message sent by ${nameRef.current.value}`);
            nameRef.current.value = "";
            emailRef.current.value = "";
            msgRef.current.value = "";
        };


        return (
            <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-md">
                <div className="grid gap-3">
                    <input ref={nameRef} placeholder="Your name" className="px-4 py-3 border rounded-lg outline-none" required />
                    <input ref={emailRef} placeholder="Email address" type="email" className="px-4 py-3 border rounded-lg outline-none" required />
                    <textarea ref={msgRef} placeholder="Message" rows={5} className="px-4 py-3 border rounded-lg outline-none" required />
                    <button className="px-5 py-3 bg-amber-400 rounded-lg font-semibold hover:brightness-95">Send Message</button>
                </div>
            </form>
        );
    }



    return (
        <div className="pt-20">

            {/* HERO CAROUSEL */}
            <section className="relative w-full h-[70vh] overflow-hidden rounded-xl mx-auto max-w-7xl">
                {heroSlides.map((slide, index) => (
                    <motion.div
                        key={slide.id}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.img})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === current ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {index === current && (
                            <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center px-6 md:px-16 text-white">
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-4xl md:text-5xl font-bold max-w-xl"
                                >
                                    {slide.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-3 text-lg max-w-lg"
                                >
                                    {slide.subtitle}
                                </motion.p>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="mt-6 px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 w-fit"
                                >
                                    Get Started
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Controls */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-3 rounded-full">‹</button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-3 rounded-full">›</button>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-slate-900">Platform Features</h2>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-amber-500 font-semibold hover:underline"
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(showAll ? featureCards : featureCards.slice(0, 3)).map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="p-6 bg-white shadow-md rounded-xl cursor-pointer border border-slate-200"
                        >
                            <div className="text-amber-400">{card.icon}</div>
                            <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                            <p className="mt-2 text-slate-600">{card.desc}</p>
                            <button className="mt-4 flex items-center gap-2 text-amber-500 font-medium">
                                Learn More <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="bg-white border-t mt-8">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Contact Us</h3>
                        <p className="text-slate-600 mb-6">Need help? Our team will reach out within 24 hours.</p>


                        <div className="space-y-4 text-sm text-slate-700">
                            <p><strong>Email:</strong> support@flatmgmt.example</p>
                            <p><strong>Phone:</strong> +91 98765 43210</p>
                            <p><strong>Office:</strong> 123, Residency Road, Pune</p>
                        </div>
                    </div>


                    <ContactForm />
                </div>
            </section>
        </div>
    );
}
