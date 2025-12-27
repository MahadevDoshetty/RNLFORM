import { Box, Button, TextField } from '@mui/material'
import React from 'react'

const ForgotPswd = () => {
    return (
        <Box component={'div'} sx={{ fontFamily:'sans-serif',backgroundColor: '#EB4E62', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ height: '80vh', maxHeight:'80vh',maxWidth:'40vw', width: '40vw', bgcolor: '#e4e4f4ff', borderRadius: '19px' }} >
                <Box display={'flex'} justifyContent={'center'}  >
                    <h2>Reset Password</h2>
                </Box>
                <Box display={'flex'}  justifySelf={'center'} flexDirection={'column'} width={'70%'} >
                    <h3>Email Address</h3>
                    <TextField type='email' placeholder='Enter your Email Address' label='Email Address' />
                    <h3>Old Password</h3>
                    <TextField  label='Old Password' placeholder='Enter your Old Password' />
                    <h3>New Password</h3>
                    <TextField  label='New Password' placeholder='Enter your New Password' />
                    <h3>Confirm Password</h3>
                    <TextField  label='Confirm Password' placeholder='Confirm your New Password' />
                    <Button variant='contained' sx={{margin:'1rem', bgcolor:'#EB4E62'}}>Submit</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ForgotPswd