import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same", toastOptions);
            return false;
        } else if (username.length < 4) {
            toast.error("Username should be more than 4 characters", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or more than 8 characters",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastOptions);
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/auth/register`,
                {
                    username,
                    email,
                    password,
                }
            );
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                navigate("/");
            }
        }
    };
    return (
        <>
            <div className="register">
                <div className="row justify-content-center align-items-center w-100 h-100">
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
                    <div className="col-md-5">
                        <h1>Register</h1>
                        <br />
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label className="mb-2 my-3">Username</label>
                            <input
                                className="inputfield col-md-12"
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={(e) => handleChange(e)}
                            />

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

                            <label className="mb-2 my-3">Confirm Password</label>
                            <input
                                className="inputfield col-md-12"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={(e) => handleChange(e)}
                            />

                            <div className="d-flex justify-content-between align-items-center my-2">
                                <span style={{ fontSize: "17px" }}>
                                    Already have an account ? <Link to="/">Login</Link>
                                </span>

                                <button className="click btn btn-primary my-2" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;