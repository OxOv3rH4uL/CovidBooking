import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUpdateCentre = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        centre_name: '',
        city: '',
        slots: '',
    });

    useEffect(() => {
        const id = localStorage.getItem('up_id');
        axios.get(`http://localhost:3001/centre/${id}`)
            .then(res => {
                setFormData(res.data[0]);
            })
            .catch(err => {
                alert(`Internal Server Error: ${err}`);
            });
    }, [localStorage.getItem('up_id')]); // Adding up_id to the dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = localStorage.getItem('up_id');
        axios.put(`http://localhost:3001/update_centre/${id}`, formData)
            .then(res => {
                if (res.status === 200 && res.data === "Updated Successfully!") {
                    alert('Updated Successfully!');
                    navigate('/admin');
                }
            })
            .catch(err => {
                alert(`Internal Server Error! :${err}`);
            });
    };

    return (
        <div className="bg-black min-h-screen flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Update Centre</h1>
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
                            name="city" // Corrected name attribute
                            value={formData.city}
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
                        Update Centre
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminUpdateCentre;
