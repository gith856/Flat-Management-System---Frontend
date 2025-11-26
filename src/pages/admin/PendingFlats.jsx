import React, { useEffect, useState } from "react";
import { approveFlat, getPendingFlats, rejectFlat } from "../../api/admin";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const StatusTag = ({ status }) => {
  const s = status?.toLowerCase();
  const base = "text-xs px-2 py-1 rounded-full border font-semibold";
  const cls =
    s === "pending"
      ? `${base} border-amber-300 text-amber-700 bg-amber-100`
      : s === "approved"
      ? `${base} border-blue-600 text-blue-700`
      : s === "rejected"
      ? `${base} border-red-600 text-red-700`
      : `${base} bg-gray-100 text-gray-700 border-gray-200`;
  return <span className={cls}>{s}</span>;
};

const PendingFlats = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [flatId, setFlatId] = useState(null);

  const loadPendingFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getPendingFlats();
      setFlats(data.flats);
    } catch (err) {
      setErr("Error fetching pending flats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingFlats();
  }, []);

  const onApprove = async (id) => {
    if (!window.confirm("Sure, approve this flat?")) return;
    try {
      setFlatId(id);
      await approveFlat(id);
      await loadPendingFlats();
    } catch {
      alert("Failed to approve flat");
    } finally {
      setFlatId(null);
    }
  };

  const onReject = async (id) => {
    if (!window.confirm("Sure, reject this flat?")) return;
    try {
      setFlatId(id);
      await rejectFlat(id);
      await loadPendingFlats();
    } catch {
      alert("Failed to reject flat");
    } finally {
      setFlatId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );

  if (err)
    return <p className="text-center text-red-600 font-semibold mt-6">{err}</p>;

  if (!flats.length)
    return <p className="text-center text-gray-500 mt-6">No Pending Flats.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Pending Flats</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-4 hover:shadow-2xl transition border border-gray-200 flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
              {Array.isArray(f.images) && f.images.length ? (
                <img
                  src={f.images[0]}
                  alt={f.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 grid place-items-center text-xs text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Title + Status */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <StatusTag status={f.status} />
            </div>

            {/* Address & Price */}
            <p className="text-gray-600 text-sm">{f.address}</p>
            <p className="text-blue-600 font-bold mt-1">₹ {f.price}</p>

            {/* Owner Info */}
            <div className="text-sm text-gray-700 mt-2 space-y-1">
              <p>
                <span className="font-medium">Owner:</span> {f.owner.name} ({f.owner.email})
              </p>
              <p>
                <span className="font-medium">Phone:</span> {f.owner.phoneNo}
              </p>
              <p>
                <span className="font-medium">Address:</span> {f.owner.address}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onApprove(f.id)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                disabled={flatId === f.id}
              >
                {flatId === f.id ? "Working..." : "Approve"}
              </button>
              <button
                onClick={() => onReject(f.id)}
                className="flex-1 bg-red-400 text-white py-2 rounded-lg hover:bg-red-500 transition disabled:opacity-50"
                disabled={flatId === f.id}
              >
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PendingFlats;
