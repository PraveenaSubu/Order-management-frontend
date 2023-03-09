import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CustomerList from "./pages/Customers/CustomerList";
import CustomerAdd from "./pages/Customers/CustomerAdd";
import CustomerUpdate from "./pages/Customers/CustomerUpdate";
import ProductList from "./pages/Products/ProductList";
import ProductAdd from "./pages/Products/ProductAdd";
import ProductUpdate from "./pages/Products/ProductUpdate";
import OrderList from "./pages/Orders/OrderList";
import OrderAdd from "./pages/Orders/OrderAdd";
import OrderUpdate from "./pages/Orders/OrderUpdate";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/customeradd" element={<CustomerAdd />} />
          <Route path="/:id/customerupdate" element={<CustomerUpdate />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/productadd" element={<ProductAdd />} />
          <Route path="/:id/productupdate" element={<ProductUpdate />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/orderadd" element={<OrderAdd />} />
          <Route path="/:id/orderupdate" element={<OrderUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;