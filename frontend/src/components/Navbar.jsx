import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import Menu from './Menu'

function Navbar() {
  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname
  const showMenu = () => {
    setMenu(!menu)
  }
  const user = null; // Replace with actual user logic (e.g., from context or props)

  return (
    <div>
      <div className='flex items-center justify-between px-6 md:px-200px py-4 bg-black text-white'>
        <h1 className='text-lg md:text-2xl font-extrabold'> 
          <Link to = '/'>Blogging App</Link> {/* this is a part of react router DOM */}
        </h1>

        <div>
          {path === "/" && (
            <div className='flex justify-center items-center gap-4'>
              <input
                className='outline-none rounded-l-xl px-3 text-black bg-white'
                placeholder='Search a post'
                type='text'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
                className='cursor-pointer p-1 bg-white text-black rounded-r-xl'
              >
                <BsSearch size={20}/>
              </button>
            </div>
          )}

          <div className='hidden md:flex items-center space-x-2 md:space-x-4'>
            {user ? (
              <>
                <h3><Link to='/write'>Write</Link></h3>
                <div className='relative'>
                  <div onClick={showMenu} className='cursor-pointer'>
                    <FaBars size={25}/>
                  </div>
                  {menu && <Menu/>}
                </div>
              </>
            ) : (
              <>
                <h3><Link to='/login'>Login</Link></h3>
                <h3><Link to='/register'>Register</Link></h3>
              </>
            )}
          </div>

          <div onClick={showMenu} className='md:hidden text-lg'>
            <p className='cursor-pointer relative'>
              <FaBars size={25}/>
            </p>
            {menu && <Menu/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
