import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { selectAllUsers } from '../users/userSlice';
import { useSelector } from 'react-redux';



const SingleBlogExcerpt = ({post}) => {
    const users = useSelector(selectAllUsers);
    let owner = users.find((user)=> user.id === post.owner)
    console.log("Image URL:", post.image);
  const date = post && post.date_posted ? new Date(post.date_posted ): new Date();
  const options ={year :"numeric", month :'long',day:'numeric'};
  const formatedDate = date.toLocaleDateString("en-US",options);
  return (
    <div className='mt-2'>
        <div className='flex bg-teal-400 justify-around text-white font-bold text-lg'>
            <h5>posted BY: {owner.username}</h5>
            <p className='flex gap-1 items-center'><AccessTimeIcon /> {formatedDate}</p>
         
        </div>
        <div>
            <img className='px-2 mt-3 rounded-lg object-fill h-120 w-100' src={`http://localhost:8000${post.image}`} alt={post.title}/>
        </div>
        <div  className='mt-3 text-center'>
            <h1 className='font-extrabold text-2xl underline cursor-pointer'>{post.title}</h1>
            <p className='mt-2 text-start ml-2 antialiased'>{post.description}</p>
        </div>
    </div>
  )
}

export default SingleBlogExcerpt