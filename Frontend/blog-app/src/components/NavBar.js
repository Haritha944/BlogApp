import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategoryFilter } from '../features/blogger/bloggerSlice';
import { selectIsAuthenticated } from '../features/authentication/authSlice';

const NavBar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch();

    const handleCategoryClick = ((category)=>{
        if (category === 'all'){
         dispatch(setCategoryFilter(null));
        }else{
            dispatch(setCategoryFilter(category));
        }
    })
  return (
    <div className='shadow py-5 sticky top-0 bg-slate-100'>
        <nav className='flex justify-between mx-20 h-8'>
            <Link to='/' onClick={()=>handleCategoryClick('all')}> <div className='font-extrabold text-3xl'>DA BLOGGER</div> </Link>
            <div className='uppercase text-metal font-semibold'>
            <ul className='flex gap-3 cursor-pointer'>
                <li className='' onClick={()=>handleCategoryClick('all')}>All</li>
                <li onClick={ ()=>handleCategoryClick('technology')}>Technology</li>
                <li onClick={()=> handleCategoryClick ('politics')}>Politics</li>
                <li onClick={ ()=> handleCategoryClick ('World')}>World</li>
                <li onClick={()=> handleCategoryClick ('WorldLife')}>WorldLife</li>
                <li onClick={()=> handleCategoryClick ('climate')}>Climate</li>
            </ul>
            </div>
            <div className='flex gap-3 uppercase font-semibold'>
                {isAuthenticated ? (
                    <div className='flex items-center gap-4'>
                        <div className='text-sm flex gap-2'><p>Hello</p >@{user.username}</div>
                        <button className='bg-pink-500 rounded px-3 py-2
                     text-white font-semibold shadow shadow-pink-500'>Logout</button>
                        </div>
                ):(
                    <>
                    <Link to='/login'>
                    <button className='bg-pink-500 rounded px-3 py-2
                     text-white font-semibold shadow shadow-pink-500'>LOGIN</button> </Link>
                <Link to='/register'> <button className='bg-pink-500 rounded px-3 py-2
                     text-white font-semibold shadow shadow-pink-500'>REGISTER</button> </Link>
                    </>
                )}
               
            </div>
            
        </nav>
       
    </div>
  )
}

export default NavBar