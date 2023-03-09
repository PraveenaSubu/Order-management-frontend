import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { password, email } = values;
        if (email === "") {
            toast.error("Email and Password is required", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Email and Password is required", toastOptions);
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const { password, email } = values;

            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/auth/login`,
                {
                    email,
                    password,
                }
            );
            if (data.status === true) {
                console.log("User signed in successfully ", data);
                await localStorage.setItem("token", JSON.stringify(data.token));
                navigate("/home");
            } else if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
        }
    };

    return (
        <>
            <div className="login">
                <div className="row justify-content-center align-items-center w-100 h-100">
                    <div className="col-md-5">
                        <h1>Login</h1>
                        <br />
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label className="mb-2 my-3">Email</label>
                            <input
                                className="inputfield col-md-12"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleChange(e)}
                            />

                            <label className="mb-2 my-3">Password</label>
                            <input
                                className="inputfield col-md-12"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => handleChange(e)}
                            />
                            <br />
                            <div className="d-flex justify-content-between align-items-center my-2">
                                <span style={{ fontSize: "17px" }}>
                                    Don't have an account ? <Link to="/register">Register</Link>
                                </span>
                                <button className="click btn btn-primary my-2">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5">
                        <div className="lottie">
                            <lottie-player
                                src="https://assets3.lottiefiles.com/packages/lf20_qpsnmykx.json"
                                background="transparent"
                                speed="1"
                                loop
                                autoplay
                            ></lottie-player>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;