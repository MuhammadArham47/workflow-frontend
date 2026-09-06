import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './admin/Admin'
import UserDashboard from './user/UserPanel'

function Dashboard() {
  return (
    <>
    <Routes>
        <Route path='admindashboard' element={<AdminDashboard />} />
        <Route path='userDashboard' element={<UserDashboard />} />
    </Routes>
    </>
  )
}

export default Dashboard