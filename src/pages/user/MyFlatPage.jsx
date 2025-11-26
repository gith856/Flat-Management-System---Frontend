import React, { useEffect, useState } from "react";
import MyFlatList from "../../components/MyFlatList";
import { getMyFlats } from "../../api/user";
import { Loader } from "lucide-react";

const MyFlatsPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadAllUserFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getMyFlats();
      setFlats(data.flats || []);
    } catch (err) {
      setErr("Failed to fetch your flats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUserFlats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-16 h-16 text-blue-600" />
      </div>
    );

  if (err)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">{err}</p>
      </div>
    );

  if (flats.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Flats Yet</h2>
        <p className="text-gray-500 text-lg">
          You haven't added any flats yet. Click "Add Flat" to get started.
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Flats</h2>
        <p className="text-gray-500 text-sm">Total Flats: {flats.length}</p>
      </div>

      {/* Flats List */}
      <div>
        <MyFlatList flats={flats} />
      </div>
    </div>
  );
};

export default MyFlatsPage;
