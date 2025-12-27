import { Alert, Box, Button, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };
    const [result, setResult] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password != formData.confirmpassword) {
            alert("Both the passwords must match!");
            return 0;
        };
        const response = await fetch(import.meta.env.VITE_API_URL || import.meta.env.VITE_LOCALHOST_REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        if (!response.ok) {
            setResult(data.message);
        }
        else if (response.ok) {
            setResult(data.message);
        }
    }
    return (
        <Box>
            <Box  >
                <Box display='flex' alignItems='center' gap='1rem'>
                    <h2>Registration Form</h2>
                    <a><Button variant='contained' onClick={() => navigate("/login")} >Login</Button></a>

                </Box>
                <Box component='div'  >
                    <form onSubmit={handleSubmit} >
                        <Box sx={{ display: 'flex', flexDirection: "column", gap: "1rem" }} >
                            <TextField type='name' variant='outlined' label="Name" name='name' autoComplete='off' placeholder='Enter your Full name' sx={{ width: "25vw" }} onChange={handleChange} />
                            <TextField type='email' variant='outlined' label="Email" autoComplete='off' placeholder='Enter your Email Address' sx={{ width: "25vw" }} name='email' onChange={handleChange} />
                            <TextField type='password' variant='outlined' label="Password" name='password' autoComplete='off' placeholder='Enter your Password' sx={{ width: "25vw" }} onChange={handleChange} />
                            <TextField type='password' variant='outlined' label="Confirm Password" name='confirmpassword' autoComplete='off' placeholder='Confirm your password' sx={{ width: "25vw" }} onChange={handleChange} />
                            <Button variant='contained' sx={{ width: "5rem" }} type='submit'  >Submit</Button>
                            <h2  >{result}</h2>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;