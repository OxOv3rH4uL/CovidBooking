import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: '',
    pass: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/admin_login', formData)
      .then(res => {
        console.log(res);
        if (res.status === 200 && res.data === "WELCOME ADMIN") {
          alert("Going In...");
          navigate("/admin");
        }
      })
      .catch(err => {
        alert(`Invalid Credentials`);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-20">
        <h1 className="text-3xl font-bold mb-6 text-center">ADMIN LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg py-2 px-4 outline-none"
            name="user_name"
            value={formData.user_name} 
            onChange={handleChange} 
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg py-2 px-4 outline-none"
            name="pass"
            value={formData.pass} 
            onChange={handleChange} 
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
