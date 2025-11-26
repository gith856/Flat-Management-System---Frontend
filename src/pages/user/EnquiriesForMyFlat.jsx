import React, { useEffect, useState } from 'react';
import { getSellerSoldEnquiries, markFlatSold } from '../../api/user';
import EnquiriesReceived from '../../components/EnquiriesReceived';

const EnquiriesForMyFlat = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [flatId, setFlatId] = useState(null);

  // 🔹 Load all seller’s flat enquiries
  const loadAllUserFlatsEnquiries = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getSellerSoldEnquiries();
      setResponse(data.enquiries || []); // fallback to empty array
    } catch (err) {
      setErr('Failed to fetch enquiries.',err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUserFlatsEnquiries();
  }, []);

  // 🔹 Handle marking a flat as sold
  const onSold = async (enq) => {
    const buyerId = enq.buyer_id;
    const flatId = enq.flat_id;

    const ok = window.confirm(
      `Sell flat #${flatId} to ${enq.buyer.name} (${enq.buyer.email})?`
    );

    if (!ok) return;

    try {
      setFlatId(enq.id);
      await markFlatSold(flatId, buyerId);
      setResponse((list) => list.filter((x) => x.id !== enq.id));
      alert('Marked as Sold');
    } catch (err) {
      alert('Failed to mark as sold.',err);
    } finally {
      setFlatId(null);
    }
  };

  if (loading) return <p>Loading enquiries...</p>;
  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <div className="px-3 py-2">
      <h2 className="text-xl font-bold mb-2">My Enquiries for My Flats</h2>
      <EnquiriesReceived
        items={response}
        onSold={onSold}
        flatId={flatId}
      />
    </div>
  );
};

export default EnquiriesForMyFlat;
