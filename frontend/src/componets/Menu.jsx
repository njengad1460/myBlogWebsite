import React from 'react'
import { UseContext } from '../context/UserContex'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Menu() {
  const { user, setUser } = React.useContext(UseContext)
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await axios.post('/logout', {}, { withCredentials: true })
    } catch (e) {
      console.error(e)
    }
    setUser(null)
    navigate('/')
  }

  return (
    <div className='absolute top-12 right-0 bg-white text-black shadow-lg rounded-md w-48 py-2 z-50'>
      {
        !user && <h3 className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>
          <Link to='/login'>Login</Link>
        </h3>
      }
      {
        !user && <h3 className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>
          <Link to='/register'>Register</Link>
        </h3>
      }
      {
        user && <h3 className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>
          <Link to={'/profile/' + user._id}>Profile</Link>
        </h3>
      }
      {
        user && <h3 className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>
          <Link to='/write'>Write a Post</Link>
        </h3>
      }
      {
        user && <h3 className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>
          Logout
        </h3>
      }
    </div>
  )
}

export default Menu
