import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createEnquiry, getApprovedFlats } from "../../api/user";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const FlatApprovedPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadApprovedFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getApprovedFlats();
      setFlats(data.flats || []);
    } catch (err) {
      setErr("Failed to fetch approved flats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedFlats();
  }, []);

  // Normalize amenities in case backend sends string
  const normalizeAmenities = (amenities) => {
    if (!amenities) return [];
    if (typeof amenities === "string") {
      try {
        return JSON.parse(amenities);
      } catch {
        return [];
      }
    }
    if (Array.isArray(amenities)) return amenities;
    return [];
  };

  const handleEnquiry = async (flat) => {
    const flatId = flat.id;
    const message = window.prompt("Enter your enquiry message:");
    if (!message?.trim()) return;

    try {
      await createEnquiry(flatId, message.trim());
      alert("Enquiry sent successfully!");
    } catch (err) {
      alert("Failed to send enquiry.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );

  if (err)
    return <p className="text-center text-red-600 font-semibold">{err}</p>;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Flats</h2>

        <Link
          to="/user-dash/myflats/add"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          + Add Flat
        </Link>
      </div>

      {/* Flats List */}
      {flats.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No approved flats available.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {flats.map((flat, i) => (
            <motion.div
              key={flat.id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-4 hover:shadow-2xl transition border border-gray-200"
            >
              {/* Image */}
              <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                <img
                  src={flat.images?.[0]}
                  alt="flat"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              {/* Title + Address + Price */}
              <h3 className="font-semibold text-lg">{flat.title}</h3>
              <p className="text-gray-600 text-sm">{flat.address}</p>
              <p className="text-blue-600 font-bold mt-1">₹ {flat.price}</p>

              {/* Amenities */}
              <div className="mt-2 flex flex-wrap gap-2">
                {normalizeAmenities(flat.amenities)
                  .slice(0, 4)
                  .map((am, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                    >
                      {am}
                    </span>
                  ))}
              </div>

              {/* Enquiry Button */}
              <button
                onClick={() => handleEnquiry(flat)}
                className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition shadow"
              >
                Send Enquiry
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlatApprovedPage;
