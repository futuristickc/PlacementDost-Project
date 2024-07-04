import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',   
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', formData);
            alert('Registration successful! Please log in');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Register;