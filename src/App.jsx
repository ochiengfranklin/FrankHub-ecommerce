import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from "../components/Layout/UserLayout.jsx";

const App = () => {
    return (
         <BrowserRouter>
             <Routes>
                 <Route path="/" element={<UserLayout />} />
             </Routes>
         </BrowserRouter>
    )
}
export default App
