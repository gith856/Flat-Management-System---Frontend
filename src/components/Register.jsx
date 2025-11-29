import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://flat-management-system-backend.onrender.com/api/auth/register',
        { name, email, password, phoneNo, address, pincode },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = res.data;

      if (data.message === 'User Registered Successfully') {
        setResponse(data.message);
        navigate('/login');
      } else {
        setResponse(data.message || 'Registration Failed');
      }
    } catch (error) {
      setResponse('Registration Failed');
      console.error(error);
    }
  };

  return (
    <div id='register' className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-1">

          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter valid email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="number"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <textarea
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300 outline-none transition"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Pin Code</label>
            <input
              type="number"
              placeholder="Enter pin code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300 outline-none transition"
            />
          </div>

          {response && (
            <p className="text-center text-red-600 text-sm mt-1">{response}</p>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
