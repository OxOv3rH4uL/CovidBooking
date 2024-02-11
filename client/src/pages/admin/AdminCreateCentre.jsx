import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminCreateCentre = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    centre_name: '',
    centre_city: '',
    slots: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/create_centre', formData)
      .then(res => {
        console.log(res);
        if(res.status === 200 && res.data === "Created Successfully!"){
            alert("Added Successfully!");
            navigate('/admin');
        }else if(res.status === 200 && res.data === "The City already has a COVID centre"){
            alert("City Already Has a Covid Centre. Enter a different City");
            
        }
      })
      .catch(err => {
        alert(`Internal Server Error!`);
        
      });
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Centre</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="centre_name" className="block font-semibold mb-2">Centre Name</label>
            <input
              type="text"
              id="centre_name"
              name="centre_name"
              value={formData.centre_name}
              onChange={handleChange}
              className="border rounded-lg py-2 px-4 w-full outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-semibold mb-2">City</label>
            <input
              type="text"
              id="city"
              name="centre_city"
              value={formData.centre_city}
              onChange={handleChange}
              className="border rounded-lg py-2 px-4 w-full outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="slots" className="block font-semibold mb-2">Slots</label>
            <input
              type="number"
              id="slots"
              name="slots"
              value={formData.slots}
              onChange={handleChange}
              className="border rounded-lg py-2 px-4 w-full outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Add Centre
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateCentre;
