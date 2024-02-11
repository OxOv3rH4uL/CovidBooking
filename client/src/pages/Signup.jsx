import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        city: ''
    });
    const [showPassword, setShowPassword] = useState(false); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/signup", formData)
            .then(res => {
                if (res.data === "Registered Successfully!") {
                    navigate('/login');
                } else {
                    alert("Enter all details properly");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    alert("Email is already in use!");
                } else {
                    alert("Internal Server Error!");
                }
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-black">
                <div className='pt-5 px-5'>
                    <h1 className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl text-white'>
                        VAXBOOKER
                    </h1>
                </div>
            </div>

            <div className="w-1/2 bg-white">
                <div className='flex justify-center p-10'>
                    <h1 className='scroll-m-20 text-3xl font-bold tracking-tight'>REGISTER NEW USERS</h1>
                </div>
                <div className="pt-35">
                    <Container maxWidth="sm" style={{ backgroundColor: '#FFF' }}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"} // Toggle visibility based on state
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                            <Button onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "View"} 
                            </Button>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                            <div className='flex justify-center p-10'>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Signup;
