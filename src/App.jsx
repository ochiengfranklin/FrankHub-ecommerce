import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from "./components/Layout/UserLayout.jsx"
import Home from "./pages/Home.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import Checkout from "./pages/Checkout.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import SearchResults from "./pages/SearchResults.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path=":category" element={<CollectionPage />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App