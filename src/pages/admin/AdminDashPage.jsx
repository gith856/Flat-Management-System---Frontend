import React, { useEffect, useState } from 'react';
import { getAllEnquiries, getApprovedFlatsAdmin, getPendingFlats, getSoldFlats } from '../../api/admin.js';
import { Loader } from 'lucide-react';

// Single stat card
const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition">
      {icon && <div className="mb-2 text-amber-600">{icon}</div>}
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
};

const AdminDashPage = () => {
  const [counts, setCounts] = useState({ pending: 0, approved: 0, sold: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      setLoading(true);
      try {
        const [p, s, a, q] = await Promise.all([
          getPendingFlats(),
          getSoldFlats(),
          getApprovedFlatsAdmin(),
          getAllEnquiries()
        ]);

        setCounts({
          pending: p.data.flats.length,
          approved: a.data.flats.length,
          sold: s.data.flat.length,
          enquiries: q.data.enquiries.length
        });
      } catch (err) {
        setErr("Error fetching counts",err);
        // console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );

  if (err)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {err}
      </div>
    );

  return (
    <div className="p-4 md:p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Pending Flats" value={counts.pending} />
        <Card title="Approved Flats" value={counts.approved} />
        <Card title="Sold Flats" value={counts.sold} />
        <Card title="Total Enquiries" value={counts.enquiries} />
      </div>
    </div>
  );
};

export default AdminDashPage;
