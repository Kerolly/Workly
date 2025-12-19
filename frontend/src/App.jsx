import {useState} from 'react'
import {Route, Routes} from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute.jsx";

import Login from '@/pages/Login.jsx'
import SignUp from '@/pages/SignUp.jsx'
import Profile from '@/pages/Profile.jsx'
import EmployeeDashboard from "@/pages/dashboard/EmployeeDashboard.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Routes>

            <Route path="/login" element={<Login/>}/>

            <Route path="/signup" element={<SignUp/>}/>

            <Route path="/profile"
                   element={
                <ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>}/>

            <Route path="/dashboard/employee"
                   element={
                <ProtectedRoute>
                    <EmployeeDashboard/>
                </ProtectedRoute>}/>


            <Route path="*" element={<Login/>}/> {/* fallback */}
        </Routes>)
}

export default App
