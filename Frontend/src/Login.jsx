import { Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [result, setResult] = useState("");
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(import.meta.env.VITE_LOGIN_URL , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDetails)
        })
        let data = await response.json();
        if (response.ok) {
            setResult(data.message);
            navigate('/dashboard');
        }
        else if (!response.ok) {
            setResult(data.message);
        }
        localStorage.setItem('token', data.token);
    }
    // <Navigate to='/login' replace /> Navigate does nothing in js logic

    const handleChange = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit} >
            <Box>
                <Box display='flex' alignItems='center' gap='1rem' >
                    <h2>Login</h2>
                    <Button variant='contained' onClick={() => navigate("/")} >Register</Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: "1rem" }} >
                    <TextField type='email' variant='outlined' label="Email" autoComplete='off' placeholder='Enter your Email Address' sx={{ width: "25vw" }} name='email' onChange={handleChange} />
                    <TextField type='password' variant='outlined' label="Password" name='password' autoComplete='off' placeholder='Enter your Password' sx={{ width: "25vw" }} onChange={handleChange} />
                    <Button variant='contained' sx={{ width: "5rem" }} type='submit'  >Submit</Button>
                    <h2  >{result}</h2>
                </Box>
            </Box>
        </form >
    )
}
export default Login;