import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {URL} from '../url'
import Footer from '../components/Footer'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {

        // validation
        if (!username || !email || !password) {
            setErr("All fields are required.");
            return;
        }

        try {
            await axios.post(`${URL}/api/auth/register`, {
                username,
                email,
                password
            });

            setErr('');
            navigate('/login');
        } catch (error) {
            console.error(error);
            setErr(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 md:px-[200px] py-4'>
                
                <h1 className='text-lg md:text-xl font-extrabold'>
                    <Link to="/">Register Page</Link>
                </h1>

                <div className='flex w-full justify-center items-center h-[80vh]'>
                    <div className='flex flex-col justify-center items-center space-y-4 w-[100%] md:w-[25%]'>

                        <h1 className='text-xl font-bold'>Create account</h1>

                        <input 
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder='Enter your Username'
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />

                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Enter your Email'
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />

                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter your Password'
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />

                        <button 
                            onClick={handleRegister} 
                            className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300'
                        >
                            Register
                        </button>

                        {err && <span className='text-red-500 text-sm'>{err}</span>}

                        <div className='flex space-x-2 justify-center'>
                            <span className='text-sm'>Already have an account?</span>
                            <Link to='/login' className='text-blue-500 hover:underline text-sm'>
                                Login here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Register;
