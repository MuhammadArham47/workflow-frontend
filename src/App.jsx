import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from './pages/frontend/Index'
import './App.css'
import AuthPage from './pages/auth/Auth'
import Dashboard from './pages/dashboard'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/*' element={<Frontend />} />
      <Route path='/auth/*' element={<AuthPage />} />
      <Route path='/dashboard/*' element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App