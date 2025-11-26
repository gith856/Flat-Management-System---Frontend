import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Users, BarChart, Bell, CreditCard, Settings, Building2, Home } from "lucide-react";

export default function FeaturePage() {
  const features = [
    {
      icon: <Home className="w-10 h-10" />,
      title: "Flat Listings",
      desc: "Browse verified flats with detailed information and photos.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Resident Management",
      desc: "Manage all residents with a centralized digital directory.",
    },
    {
      icon: <Bell className="w-10 h-10" />,
      title: "Notice Board",
      desc: "Broadcast announcements instantly to all members.",
    },
    {
      icon: <CreditCard className="w-10 h-10" />,
      title: "Online Payments",
      desc: "Seamless maintenance payments with digital receipts.",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Security & Visitors",
      desc: "Track visitors, delivery entries and approvals in real-time.",
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Apartment Info",
      desc: "View flat numbers, owners, tenants and occupancy status.",
    },
    {
      icon: <BarChart className="w-10 h-10" />,
      title: "Reports & Analytics",
      desc: "Track maintenance dues, payments, complaints and more.",
    },
    {
      icon: <Settings className="w-10 h-10" />,
      title: "Admin Controls",
      desc: "Full access for admins to manage society operations.",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Complaint Portal",
      desc: "Lodge complaints and track resolution in a structured flow.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-800 py-20">
      {/* HEADER */}
      <header className="text-center py-16 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Platform Features</h1>
        <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
          Explore all the tools that make your society smarter, secure, and easier to manage.
        </p>
      </header>

      {/* GRID SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-slate-200"
          >
            <div className="text-amber-500 mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">{f.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

<section className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-slate-700">
  <h2 className="text-3xl font-extrabold mb-4">About Flat Management System</h2>
  <p className="mb-4">Our Flat Management System is a modern, fully digital solution designed to simplify society and apartment management. Whether you're a resident, owner, or society admin, the platform helps you manage everyday tasks smoothly with automation and real-time updates.</p>
  <p className="mb-4">From maintenance tracking to visitor approvals, the system ensures a secure and well‑organized community experience. It also includes powerful analytics, payment dashboards, complaint tracking, and digital notice boards — all inside one intuitive interface.</p>
  <p className="mb-2 font-semibold">Key Highlights:</p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Reduce manual work for society committees and members.</li>
    <li>Improve transparency with digital records and reports.</li>
    <li>Boost convenience with online payments and visitor tracking.</li>
    <li>Strengthen community engagement through announcements and alerts.</li>
  </ul>
</section>

      {/* FOOTER */}
      {/* <footer className="bg-slate-900 text-slate-300 py-8 text-center text-sm">
        © {new Date().getFullYear()} Flat Management • All Rights Reserved
      </footer> */}
    </div>
  );
}
