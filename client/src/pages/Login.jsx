import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', formData)
            .then(res => {
                if (res.status === 200) {
                    
                    // console.log(res[0].id);
                    localStorage.setItem('id',res.data.userId)
                    alert("Going in...");
                    navigate('/centres');
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    alert("Invalid credentials. Please try again.");
                } else {
                    // console.error("An error occurred:", err);
                    alert("An error occurred. Please try again later.");
                }
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex h-screen'>
            <div className='w-1/2 bg-white flex justify-center items-center'>
                <Container maxWidth="sm">
                    <div className='flex justify-center'>
                        <h1 className='scroll-m-20 text-3xl font-bold tracking-tight text-black'>LOGIN</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <Button onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide" : "View"} 
                        </Button>
                        <div className='flex justify-center mt-3'>
                            <Button type="submit" variant="contained" color="primary">
                                Start to Book!
                            </Button>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <span className='text-black'>New User?</span>
                            <a href='/signup' className='text-black underline ml-1'>Create an Account Here!</a>
                        </div>
                    </form>
                </Container>
            </div>
            <div className='w-1/2 bg-black flex justify-end px-5 py-5'>
                <h1 className='scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl text-white'>VAXBOOKER</h1>
            </div>
        </div>
    )
}

export default Login;
