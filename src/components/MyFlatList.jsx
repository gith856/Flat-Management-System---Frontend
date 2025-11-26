import React from "react";

function StatusTag({ status }) {
  const s = status.toLowerCase();
  const base = "text-xs px-2 py-1 rounded-full border";
  const cls =
    s === "approved"
      ? `${base} border-blue-600 text-blue-700`
      : s === "pending"
        ? `${base} border-amber-100 text-amber-700 border-amber-200`
        : s === "sold"
          ? `${base} border-green-600 text-green-700`
          : s === "rejected"
            ? `${base} border-red-600 text-red-700`
            : `${base} bg-gray-100 text-gray-700 border-gray-200`;
  return <span className={cls}>{s}</span>;
}
const MyFlatList = ({ flats }) => {
  const list = Array.isArray(flats) ? flats : [];
  if (!list.length) return <p>No flats Found</p>;
  return (

    <div className="space-y-4">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {list.map((f) => {
          return (
            <div key={f.id} className="bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-4 hover:shadow-2xl transition border border-gray-300 ">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{f.title}</h3>
                <StatusTag status={f.status} />
              </div>

              {<p>{f.address}</p>}
              {<p>Price :{"\u20B9"}{Number(f.price)}</p>}
              {<p className="text-sm mt-1">{f.description}</p>}
              {<p>Created on : {new Date(f.created_at).toLocaleString()}</p>}

              {/* images */}
              {Array.isArray(f.images) && f.images.length ? (
                <div className="mt-3 flex gap-2 overflow-hidden mb-3">
                  {f.images.map((src, i) => (
                    <img
                      key={`${f.id}-${i}`}
                      src={src}
                      loading="lazy"
                      className="w-32 h-24 object-cover rounded border shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-3 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs">
                  No image
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFlatList;