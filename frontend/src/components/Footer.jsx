import React from 'react'

function Footer() {
  return (
    <div>
      <div className='mt-8 w-full bg-black md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-star md:justify-between text-sm md:text-md py-8'>
        <div className='flex flex-col text-white'>
            <p>featured Blogs</p>
            <p>Most viewed</p>
            <p>Readers Choice</p>

        </div>
        <div className='flex flex-col text-white'>
            <p>featured Blogs</p>
            <p>Most viewed</p>
            <p>Readers Choice</p>

        </div>
        <div className='flex flex-col text-white'>
            <p>featured Blogs</p>
            <p>Most viewed</p>
            <p>Readers Choice</p>

        </div>

      </div>
      <p className='py-2 pb-6 text-white bg-black text-sm'> All rights resrved @Davy 2025</p>
    </div>
  )
}

export default Footer
