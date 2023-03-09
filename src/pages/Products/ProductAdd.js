import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./Product.css";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const ProductAdd = () => {
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({
        productImg: "",
        productName: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
    });

    const handleChange = (value) => {
        return setProductDetails((products) => {
            return { ...products, ...value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Product Details ", productDetails);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/products`,
                productDetails
            );
            if (response) {
                setProductDetails({
                    productImg: "",
                    productName: "",
                    brand: "",
                    category: "",
                    price: "",
                    stock: "",
                });
                navigate("/productlist");
            }
        } catch (error) {
            console.log("Erro while adding product: ", error);
        }
    };
    return (
        <>
            <div className="productAdd">
                <Sidebar />
                <div className="productAddContainer">
                    <Navbar />
                    <div className="addTop d-flex justify-content-between">
                        <h1
                            className="addHeading"
                            style={{ fontSize: "20px", color: "gray" }}
                        >
                            Add New Product
                        </h1>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/productlist" className="addLink ">
                                <FastRewindIcon />
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="addBottom">
                        <div className="addLeftSide">
                            <img
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                alt="cameraicon"
                                className="addImage"
                            />
                        </div>
                        <div className="addRightSide">
                            <form onSubmit={handleSubmit} className="addForm">
                                <div className="addFormInput">
                                    <label className="addLableStyle">Product Name</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: Mac Book"
                                        required
                                        value={productDetails.productName}
                                        onChange={(e) =>
                                            handleChange({ productName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Product Image URL</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: https://www.imageUrl.com"
                                        required
                                        value={productDetails.productImg}
                                        onChange={(e) =>
                                            handleChange({ productImg: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Brand</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: Apple"
                                        required
                                        value={productDetails.brand}
                                        onChange={(e) => handleChange({ brand: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Category</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: laptop"
                                        required
                                        value={productDetails.category}
                                        onChange={(e) => handleChange({ category: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Price (₹)</label>
                                    <input
                                        className="addInputSytle"
                                        type="number"
                                        placeholder="Ex: 999"
                                        required
                                        value={productDetails.price}
                                        onChange={(e) => handleChange({ price: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Stock</label>
                                    <input
                                        className="addInputSytle"
                                        type="number"
                                        placeholder="Ex: 50 (stock in nos.)"
                                        required
                                        value={productDetails.stock}
                                        onChange={(e) => handleChange({ stock: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="addButton">
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductAdd;