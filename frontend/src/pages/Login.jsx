import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {URL} from "../url";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);   // store logged-in user globally

    const handleLogin = async () => {
        if (!email || !password) {
            setErr("All fields are required.");
            return;
        }

        try {
            const res = await axios.post(`${URL}/api/auth/login`, {
                email,
                password,
            }, { withCredentials: true });

            // Save user to global context
            setUser(res.data);

            setErr("");
            navigate("/");   // redirect to homepage
            
        } catch (error) {
            console.error(error);
            setErr(error.response?.data?.message || "Invalid email or password.");
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 md:px-[200px] py-4">
                <h1 className="text-lg md:text-xl font-extrabold">
                    <Link to="/">Login Page</Link>
                </h1>

                <div className="flex w-full justify-center items-center h-[80vh]">
                    <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">

                        <h1 className="text-xl font-bold">Welcome Back</h1>

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your Password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>

                        {err && <span className="text-red-500 text-sm">{err}</span>}

                        <div className="flex space-x-2 justify-center">
                            <span className="text-sm">Don't have an account?</span>
                            <Link to="/register" className="text-blue-500 hover:underline text-sm">
                                Register here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;
