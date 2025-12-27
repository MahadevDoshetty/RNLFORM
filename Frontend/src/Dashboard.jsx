import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, replace, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const dataFetch = async () => {
        const response = await fetch(import.meta.env.VITE_DASHBOARD , {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            navigate('/error', { replace: true });
        }
        setMessage(data.message);
    }
    dataFetch();
    return (
        <Box>
            <Box>
                <h2>Dashboard</h2>
            </Box>
            <Box>
                <h3>{message} </h3>
                <Button variant='text' sx={{ width: '10rem' }} onClick={() => navigate('/resetpswd')} >Change Password</Button>
            </Box>
        </Box>
    )
}

export default Dashboard