import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '@/pages/login.jsx'
import Signup from '@/pages/signup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} /> {/* fallback */}
      </Routes>
  )
}

export default App
