import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Error from './Error';
import ProtectedRoute from './ProtectedRoute';
import ForgotPswd from './ForgotPswd';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
      <Route path='/resetpswd' element={<ProtectedRoute ><ForgotPswd /></ProtectedRoute>} />
      <Route path='/error' element={<Error />} />
    </Routes>
  )
}

export default App;