import { ArrowBack } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const ForgotPswd = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [resetDetails, setResetDetails] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const handleChange = (e) => {
        setResetDetails({ ...resetDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (resetDetails.oldPassword == resetDetails.newPassword) {
            alert(`Old and New Password cannot be same !`);
            return 1;
        }
        else if (resetDetails.newPassword !== resetDetails.confirmNewPassword) {
            alert(`Both the new passwords must match! `);
            return 1;
        }
        try {
            const response = await fetch(import.meta.env.VITE_LOCALHOST_RESET || import.meta.env.VITE_RESET, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(resetDetails)
            });
            const data = await response.json();
            setMessage(data.message);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box component={'div'} sx={{ bgcolor: "#1F2937", height: '100vh', color: '#F9FAFB', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ backgroundColor: "#374151", justifyItems: 'center' }} >
                <Box sx={{ bgcolor: '#374151', width: '30vw', borderRadius: '7px', display: 'grid', justifyContent: 'center', justifyItems: 'center', alignSelf: 'center' }}>
                    <Box display='flex' alignItems='center' gap='1rem'  >
                        <h2>Reset Password</h2>
                    </Box>
                    <form >
                        <Box sx={{ display: 'flex', flexDirection: "column", gap: "1rem" }} >
                            <TextField type='password' value={resetDetails.oldPassword} onChange={handleChange} name='oldPassword' sx={{
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
                            } autoComplete='on' label='Old Password' placeholder='Enter your Old Password' />
                            <TextField type='password' value={resetDetails.newPassword} sx={{
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
                            } onChange={handleChange} autoComplete='on' name='newPassword' label='New Password' placeholder='Enter your New Password' />
                            <TextField type='password' value={resetDetails.confirmNewPassword} onChange={handleChange} autoComplete='on' sx={{
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
                            } name='confirmNewPassword' label='Confirm Password' placeholder='Confirm your New Password' />
                            <Button variant='contained' sx={{ margin: '1rem', gap:'1rem' }} type='submit' onClick={handleSubmit} >Submit  </Button>
                            <Button variant='contained' onClick={() => navigate('/dashboard')} sx={{gap:'1rem'}} > <ArrowBack />  Back to Dashboard</Button>
                            <h3>{message}</h3>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default ForgotPswd;