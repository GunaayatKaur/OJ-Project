import React from 'react'
import {Link} from 'react-router-dom'
//import './HomePage.css'
export default function HomePage() {
  return (
    <>
    <div className='h-screen'>
      <div className='flex items-center justify-center'>
        <h1 className='text-gray-700 text-7xl font-extrabold'>CodeReferee</h1>
      </div>

      <Link to='/problems'>Problem</Link>
    </div>
    </>
  )
}
