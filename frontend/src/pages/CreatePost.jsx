import React from 'react'
import Footer from '../components/Footer'
import { ImCross } from 'react-icons/im';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { URL } from '../url';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState("");
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const addCategory = () => {
        if (categories.trim()) {
            setCats([...cats, categories]);
            setCategories("");
        }
    }

    const deleteCategory = (i) => {
        setCats(cats.filter((_, index) => index !== i));
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user?.username,
            userId: user?._id,
            categories: cats,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            newPost.photo = filename;

            try {
                await axios.post(`${URL}/api/upload`, data);
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.post(`${URL}/api/posts`, newPost, {withCredentials: true});
                navigate(`/post/${res.data._id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div className='w-3/4 mt-10 mb-10 p-5 bg-white rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold mb-5'>Create New Post</h2>
                    <form className='flex flex-col' onSubmit={handleCreate}>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            className='border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                        <textarea 
                            placeholder="Description" 
                            className='border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={e => setDesc(e.target.value)}
                            value={desc}
                        />
                        <input 
                            type="file" 
                            className='px-4 mb-4' 
                            onChange={(e) => setFile(e.target.files[0])} 
                        />
                        <div className='flex flex-col'>
                            <div className='flex mb-4'>
                                <select value={categories} onChange={(e) => setCategories(e.target.value)}>
                                    <option value="">Select a category</option>
                                    <option value="Big Data">Big Data</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Programming Languages">Programming Languages</option>
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Networking">Networking</option>
                                    <option value="Databases">Databases</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="Software Testing">Software Testing</option>
                                    <option value="Agile Methodologies">Agile Methodologies</option>
                                    <option value="Blockchain">Blockchain</option>
                                    <option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
                                </select>
                                <div onClick={addCategory} className='ml-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md'>Add</div>
                            </div>
                        </div>
                        <div className='flex flex-wrap mb-4'>
                            {cats.map((c, i) => (
                                <div key={i} className='flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2'>
                                    <span>{c}</span>
                                    <ImCross onClick={() => deleteCategory(i)} className='ml-2 cursor-pointer text-red-500' />
                                </div>
                            ))}
                        </div>
                        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default CreatePost