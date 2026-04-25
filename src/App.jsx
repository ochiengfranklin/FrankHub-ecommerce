import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from "./components/Layout/UserLayout.jsx"
import Home from "./pages/Home.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import Checkout from "./pages/Checkout.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import SearchResults from "./pages/SearchResults.jsx"
import NotFound from "./pages/NotFound.jsx"
import Profile from "./pages/Profile.jsx"
import AdminLayout from "./admin/components/AdminLayout.jsx"
import AdminDashboard from "./admin/pages/AdminDashboard.jsx"
import AdminProducts from "./admin/pages/AdminProducts.jsx"
import AdminOrders from "./admin/pages/AdminOrders.jsx"
import FAQ from "./pages/FAQ.jsx";
import Shipping from "./pages/Shipping.jsx";
import Contact from "./pages/Contact.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                </Route>

                {/* Main routes */}
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path=":category" element={<CollectionPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="shipping" element={<Shipping />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="track-order" element={<TrackOrder />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App