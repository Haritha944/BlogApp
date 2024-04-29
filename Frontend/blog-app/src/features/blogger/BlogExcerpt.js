import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/userSlice';


const BlogExcerpt = ({post,postId,posterId}) => {

  const users = useSelector(selectAllUsers);
  let owner = users.find((user)=> user.id === posterId)
  console.log("Image URL:", post.image);
  const date = post && post.date_posted ? new Date(post.date_posted ): new Date();
  const options ={year :"numeric", month :'long',day:'numeric'};
  const formatedDate = date.toLocaleDateString("en-US",options);
  return (
   
    <div className='w-80 shadow-lg '>
            <img className='object-cover h-72 w-full rounded-lg' src={`http://localhost:8000${post.image}`}  alt={post.title} loading='lazy' />
    <div className='mb-3'>
       <div className='flex justify-between items-center bg-teal-400 px-3 mt-3 text-white '>
        <div>
          <p>posted by:{owner.username}</p>
        </div>
        <div>
          <AccessTimeIcon className='text-sm me-2'/>
          {formatedDate}
        </div>
       </div>
       <h1 className='font-bold'>{post.title}</h1>
       <p>{post.description.substring(0,100)}....</p>
       <div className='text-white text-center mt-3 '>
        <Link to={`blog/${postId}`}>
         <button className='bg-blue-700 py-2 px-4 rounded-md'>Continue Reading....</button>
         </Link>
       </div>
      </div>
      </div>
      
  )
}

export default BlogExcerpt