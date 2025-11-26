import React, { useState } from "react";
import { createFlat } from "../../api/user.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MAX_FILES = 5;
const MAX_MB = 5;

const AddFlatPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    address: "",
    price: "",
    description: "",
    amenities: "",
  });

  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onFiles = (e) => {
    setErr(null);
    const chosen = Array.from(e.target.files || []);
    const next = [];

    for (const f of chosen) {
      if (files.length + next.length >= MAX_FILES) break;
      if (f.size > MAX_MB * 1024 * 1024) {
        setErr(`"${f.name}" is larger than ${MAX_MB}MB`);
        continue;
      }
      next.push(f);
    }

    setFiles((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const removeFile = (i) => {
    setFiles((arr) => arr.filter((_, index) => index !== i));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (!files.length) {
      setErr("Please upload at least one image");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "amenities") {
          const amenities = value
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean);
          formData.append("amenities", JSON.stringify(amenities));
        } else {
          formData.append(key, value.trim());
        }
      });

      files.forEach((file) => formData.append("images", file));

      await createFlat(formData);
       toast.error("Flat Submit Successfully!");
            
      navigate("/user-dash/myflats");
    } catch (error) {
      setErr(error.message || "Failed to create flat");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-6 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Your Flat
        </h1>

        {err && (
          <p className="text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-300 text-sm">
            {err}
          </p>
        )}

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Luxury 2BHK Apartment"
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Price</label>
              <input
                name="price"
                value={form.price}
                onChange={onChange}
                placeholder="12000 / month"
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
                placeholder="Street, City, State"
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Describe your flat..."
                required
                rows={3}
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Amenities</label>
              <input
                name="amenities"
                value={form.amenities}
                onChange={onChange}
                placeholder="WiFi, Parking, AC, Balcony"
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Images</label>

            <div className="border-2 border-dashed border-gray-300 p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onFiles}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max {MAX_FILES} images, {MAX_MB}MB each
              </p>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg"
                  >
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      className="text-red-600 text-xs hover:underline"
                      onClick={() => removeFile(i)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            disabled={saving}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
          >
            {saving ? "Submitting..." : "Submit Flat"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlatPage;
