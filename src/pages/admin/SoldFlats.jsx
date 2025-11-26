import React, { useEffect, useState } from "react";
import { getSoldFlats } from "../../api/admin";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const StatusTag = ({ status }) => {
  const s = status?.toLowerCase();
  const base = "text-xs px-2 py-1 rounded-full border font-semibold";
  const cls =
    s === "sold"
      ? `${base} border-green-600 text-green-700 bg-green-100`
      : s === "approved"
      ? `${base} border-blue-600 text-blue-700 bg-blue-100`
      : s === "pending"
      ? `${base} border-amber-300 text-amber-700 bg-amber-100`
      : `${base} bg-gray-100 text-gray-700 border-gray-200`;
  return <span className={cls}>{s}</span>;
};

const SoldFlats = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadSoldFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getSoldFlats();
      setFlats(data.flat);
    } catch {
      setErr("Error fetching sold flats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSoldFlats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );

  if (err)
    return <p className="text-center text-red-600 font-semibold mt-6">{err}</p>;

  if (!flats.length)
    return <p className="text-center text-gray-500 mt-6">No Sold Flats.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Sold Flats</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.map((f) => {
          const buyer = f.soldTo;
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-4 hover:shadow-2xl transition border border-gray-200 flex flex-col"
            >
              {/* Title + Status */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <StatusTag status={f.status} />
              </div>

              {/* Address & Price */}
              <p className="text-gray-600 text-sm">{f.address}</p>
              <p className="text-blue-600 font-bold mt-1">₹ {f.price}</p>

              {/* Sold Date */}
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Sold on:</span>{" "}
                {new Date(f.sold_date).toLocaleString()}
              </p>

              {/* Owner & Buyer Info */}
              <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
                <div>
                  <p className="font-semibold mb-1">Owner:</p>
                  <p>{f.owner.name} ({f.owner.email})</p>
                  <p>Phone: {f.owner.phoneNo}</p>
                  <p>Address: {f.owner.address}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Buyer:</p>
                  <p>{buyer.name} ({buyer.email})</p>
                  <p>Phone: {buyer.phoneNo}</p>
                  <p>Address: {buyer.address}</p>
                </div>
              </div>

              {/* Images */}
              {Array.isArray(f.images) && f.images.length ? (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {f.images.map((src, i) => (
                    <img
                      key={`${f.id}-${i}`}
                      src={src}
                      loading="lazy"
                      className="w-32 h-24 object-cover rounded border shrink-0 hover:scale-105 transition"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-3 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs">
                  No image
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SoldFlats;
