import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          setMsg("Message sent successfully!");
          setLoading(false);
          form.current.reset();
        },
        () => {
          setMsg("Failed to send message. Please try again!");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Header */}
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Get in <span className="text-amber-400">Touch</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Have questions about flats, tenants, maintenance or bookings?
          Our support team is here to assist you.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
          <div className="flex justify-center mb-4">
            <Phone className="h-10 w-10 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 text-center">
            Call Us
          </h3>
          <p className="text-gray-600 text-center mt-2">+91 98765 43210</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
          <div className="flex justify-center mb-4">
            <Mail className="h-10 w-10 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 text-center">
            Email Us
          </h3>
          <p className="text-gray-600 text-center mt-2">support@flatmgmt.com</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
          <div className="flex justify-center mb-4">
            <MapPin className="h-10 w-10 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 text-center">
            Visit Office
          </h3>
          <p className="text-gray-600 text-center mt-2">New Delhi, India</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-5xl mx-auto mt-16 bg-white p-10 rounded-2xl shadow-xl border px-6 md:px-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Send us a Message
        </h2>

        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="user_name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <input
            name="user_email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <input
            name="user_phone"
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <input
            name="subject"
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="md:col-span-2 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none h-36"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold py-3 rounded-xl text-lg shadow-md transition"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>

        {msg && (
          <p className="text-center mt-4 font-semibold text-blue-600">{msg}</p>
        )}
      </div>

      {/* Google Map */}
      <div className="max-w-6xl mx-auto mt-16 px-6 pb-20">
        <iframe
          className="rounded-2xl shadow-lg w-full h-72 md:h-96 border"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227822.60371562678!2d80.77770084731567!3d26.848596483935573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1763727513768!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
  );
}
