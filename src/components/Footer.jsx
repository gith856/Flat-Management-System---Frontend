import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Flat<span className="text-amber-400">Mgmt</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm">
            Smart and efficient flat management system designed to simplify
            resident, maintenance, billing, and communication tasks.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a className="hover:text-amber-400" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-amber-400" href="/features">
                Features
              </a>
            </li>
            <li>
              <a className="hover:text-amber-400" href="/contact">
                Contact
              </a>
            </li>
            <li>
              <a className="hover:text-amber-400" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
          <ul className="space-y-3">
            <li>
              <a className="hover:text-amber-400">Resident Records</a>
            </li>
            <li>
              <a className="hover:text-amber-400">Maintenance Requests</a>
            </li>
            <li>
              <a className="hover:text-amber-400">Billing & Payments</a>
            </li>
            <li>
              <a className="hover:text-amber-400">Security & Access</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-slate-400 text-sm">Email: support@flatmgmt.com</p>
          <p className="text-slate-400 text-sm mt-2">Phone: +91 98765 43210</p>
          <p className="text-slate-400 text-sm mt-2">Address: Mumbai, India</p>

          <div className="flex gap-4 mt-4">
            <a className="hover:text-amber-400 text-xl" href="#">
              🌐
            </a>
            <a className="hover:text-amber-400 text-xl" href="#">
              📘
            </a>
            <a className="hover:text-amber-400 text-xl" href="#">
              📷
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} FlatMgmt. All Rights Reserved.
      </div>
    </footer>
  );
}
