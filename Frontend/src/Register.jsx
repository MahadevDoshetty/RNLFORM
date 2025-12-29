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
        const response = await fetch(import.meta.env.VITE_API_URL, {
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
        <Box sx={{ bgcolor: "#1F2937", height: '100vh', color: '#F9FAFB', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ backgroundColor: "#374151" }} >
                <Box sx={{ bgcolor: '#374151', width: '30vw', borderRadius: '7px', display: 'grid', justifyContent: 'center', justifyItems: 'center', alignSelf: 'center' }} >
                    <Box display='flex' alignItems='center' gap='1rem'>
                        <h2>Registration Form</h2>
                        <a><Button variant='contained' sx={{ bgcolor: "#3B82F6", color: '#FFFFFF' }} onClick={() => navigate("/login")} >Login</Button></a>
                    </Box>
                    <Box component='div'  >
                        <form onSubmit={handleSubmit} >
                            <Box sx={{ display: 'flex', flexDirection: "column", gap: "1rem" }} >
                                <TextField type='name' variant='outlined' label="Name" name='name' autoComplete='off' placeholder='Enter your Full name' sx={{
                                    width: "25vw",
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#F9FAFB'
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#F9FAFB'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#F9FAFB'
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#F9FAFB"
                                    }

                                }} onChange={handleChange} />
                                <TextField type='email' variant='outlined' label="Email" autoComplete='off' placeholder='Enter your Email Address' sx={{
                                    width: "25vw",
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#F9FAFB'
                                    }, "& .MuiInputBase-input": {
                                        color: "#F9FAFB"
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#F9FAFB'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#F9FAFB'
                                    }
                                }} name='email' onChange={handleChange} />
                                <TextField type='password' variant='outlined' label="Password" name='password' autoComplete='off' placeholder='Enter your Password' sx={{
                                    width: "25vw",
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#F9FAFB'
                                    }, "& .MuiInputBase-input": {
                                        color: "#F9FAFB"
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#F9FAFB'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#F9FAFB'
                                    }

                                }} onChange={handleChange} />
                                <TextField type='password' variant='outlined' label="Confirm Password" name='confirmpassword' autoComplete='off' placeholder='Confirm your password' sx={{
                                    width: "25vw",
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#F9FAFB'
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#F9FAFB"
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#F9FAFB'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#F9FAFB'
                                    }
                                }
                                } onChange={handleChange} />
                                <Button variant='contained' sx={{
                                    width: "5rem", bgcolor: "#3B82F6", color: '#FFFFFF',
                                }} type='submit'  >Submit</Button>
                                <h2  >{result}</h2>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;