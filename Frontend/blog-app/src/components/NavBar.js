import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='shadow py-5 sticky top-0 bg-slate-100'>
        <nav className='flex justify-between mx-20 h-8'>
            <Link to='/'> <div className='font-extrabold text-3xl'>DA BLOGGER</div> </Link>
            <div className='uppercase text-metal font-semibold'>
            <ul className='flex gap-3 cursor-pointer'>
                <li className=''>All</li>
                <li>Technology</li>
                <li>Politics</li>
                <li>World</li>
                <li>WorldLife</li>
                <li>Climate</li>
            </ul>
            </div>
            <div>
                <div className='flex gap-3 uppercase font-semibold'>
                    <Link to='/login'>
                    <button className='bg-pink-500 rounded px-3 py-2
                     text-white font-semibold shadow shadow-pink-500'>LOGIN</button> </Link>
                <Link to='/register'> <button className='bg-pink-500 rounded px-3 py-2
                     text-white font-semibold shadow shadow-pink-500'>REGISTER</button> </Link>
                    
                </div>
            </div>
            
        </nav>
       
    </div>
  )
}

export default NavBar