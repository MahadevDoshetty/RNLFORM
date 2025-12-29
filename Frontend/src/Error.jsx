import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <h2>You are not authorized to view this page</h2>
      <Button variant='contained' sx={{margin:'1rem'}} name='' onClick={(e) => navigate(`/${e.target.name}`)} >Register</Button>
      <Button variant='contained' name='login' onClick={(e) => navigate(`/${e.target.name}`)} >Login</Button>
    </Box>
  )
}

export default Error