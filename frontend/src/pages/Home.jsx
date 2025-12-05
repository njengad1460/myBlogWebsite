import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { URL } from '../url';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext";

function Home() {

  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${URL}/posts${search}`);
        setPosts(res.data);

        // Extract categories safely
        const categories = res.data.flatMap(item => item.categories || []);
        const unique = Array.from(new Set(categories));
        setCat(unique);

        setNotFound(res.data.length === 0);

      } catch (error) {
        console.log("Error fetching posts:", error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [search]);

  const handleFilterCat = (category) => {
    const filtered = posts.filter(post => post.categories?.includes(category));
    setPosts(filtered);
  };

  return (
    <div>
      <Navbar />

      {/* Category Filter */}
      <div className="flex flex-wrap">
        <div className="w-3/4 p-4 m-5 flex flex-wrap justify-center">
          {cat.length > 0 &&
            cat.map((category) => (
              <button
                key={category}
                className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
                onClick={() => handleFilterCat(category)}
              >
                {category}
              </button>
            ))
          }
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <Loader />
        ) : notFound ? (
          <h1 className="text-3xl font-bold">No posts found</h1>
        ) : (
          posts.map(post => (
            <Link
              to={user ? `/post/${post._id}` : `/login`}
              key={post._id}
              className="w-80 m-4 border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                className="w-full h-48 object-cover"
                src={post.image || 'https://via.placeholder.com/400x200'}
                alt={post.title}
              />

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <p className="text-gray-700 text-base">
                  {post.content.substring(0, 100)}...
                </p>
              </div>

              <div className="px-6 pt-4 pb-2">
                {post.categories?.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    #{category}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
