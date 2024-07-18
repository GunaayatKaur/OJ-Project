import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex flex-row px-6 py-6 justify-between bg-gradient-to-b from-gray-400 to-gray-700 text-white rounded-b-md'>
        <Link to= '/' className='font-bold font-sans text-2xl'>Home</Link>
        <div className='w-1/5 flex flex-row justify-between font-sans'>
          <Link to= '/register' className='text-xl font-bold'>Register</Link>
          <Link to= '/login' className='text-xl font-bold'>Login</Link>
          <Link to= '/profile' className='text-xl font-bold'>Profile</Link>
        </div>
        
    </nav>
  )
}
