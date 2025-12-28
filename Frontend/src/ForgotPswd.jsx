import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

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
            const response = await fetch(import.meta.env.VITE_LOCALHOST_RESET || import.meta.env.VITE_RESET , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${localStorage.getItem('token')}`
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
        <Box component={'div'} sx={{ fontFamily: 'sans-serif', backgroundColor: '#EB4E62', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ height: '80vh', maxHeight: '80vh', maxWidth: '40vw', width: '40vw', bgcolor: '#e4e4f4ff', borderRadius: '19px' }} >
                <Box display={'flex'} justifyContent={'center'}  >
                    <h2>Reset Password</h2>
                </Box>
                <Box display={'flex'}  justifySelf={'center'} flexDirection={'column'} width={'70%'} >
                    <form >
                        <h3>Old Password</h3>
                        <TextField type='password' value={resetDetails.oldPassword} onChange={handleChange} name='oldPassword' autoComplete='on' label='Old Password' placeholder='Enter your Old Password' />
                        <h3>New Password</h3>
                        <TextField type='password' value={resetDetails.newPassword} onChange={handleChange} autoComplete='on' name='newPassword' label='New Password' placeholder='Enter your New Password' />
                        <h3>Confirm Password</h3>
                        <TextField type='password' value={resetDetails.confirmNewPassword} onChange={handleChange} autoComplete='on' name='confirmNewPassword' label='Confirm Password' placeholder='Confirm your New Password' />
                        <Button variant='contained' sx={{ margin: '1rem', bgcolor: '#EB4E62' }} type='submit' onClick={handleSubmit} >Submit</Button>
                        <Button onClick={()=>navigate('/dashboard')} >Back to Dashboard</Button>
                        <h3>{message}</h3>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default ForgotPswd;