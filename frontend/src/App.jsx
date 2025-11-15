import {useState} from 'react'
import {Route, Routes} from "react-router-dom";

import ProtectedRoute from "@/pages/components/ProtectedRoute.jsx";

import Login from '@/pages/Login.jsx'
import Signup from '@/pages/signup.jsx'
import Profile from '@/pages/Profile.jsx'
import EmployeeDashboard from "@/pages/EmployeeDashboard.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Routes>

            <Route path="/login" element={<Login/>}/>

            <Route path="/signup" element={<Signup/>}/>

            <Route path="/profile"
                   element={
                <ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>}/>

            <Route path="/dashboard/employee/:employeeId"
                   element={
                <ProtectedRoute>
                    <EmployeeDashboard/>
                </ProtectedRoute>}/>


            <Route path="*" element={<Login/>}/> {/* fallback */}
        </Routes>)
}

export default App
