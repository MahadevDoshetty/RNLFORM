import { Box, Button, IconButton } from '@mui/material'
import { Delete, Logout, LogoutOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { Navigate, replace, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const dataFetch = async () => {
        const response = await fetch(import.meta.env.VITE_DASHBOARD, {
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
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <Box sx={{ bgcolor: "#1F2937", height: '100vh', color: '#F9FAFB', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ backgroundColor: "#374151", justifyItems:'center' }}>
            <h2>Dashboard</h2>
                <Box sx={{ bgcolor: '#374151', width: '30vw', height:'20vh', borderRadius: '7px', display: 'grid', justifyContent: 'center', justifyItems: 'center', alignSelf: 'center' }} >
                        <h3  >{message} </h3>
                    <Box display='flex' alignItems='center'  >
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent:'center', alignItems:'center' }} >
                        <Box  sx={{display:'flex', justifyContent:'space-between', gap:'2rem'}} >
                            <Button variant='contained' sx={{ width: '8rem',height:'3rem' }} onClick={() => navigate('/resetpswd')} >Change Password</Button>
                            <Button variant='contained' color='error' onClick={handleLogout} > Logout <LogoutOutlined  /> </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard