import React, { useEffect } from 'react'
import SidePanel from './SidePanel'
import { fetchPosts, getPostsStatus, selectAllPosts, getPostsError } from '../features/blogger/bloggerSlice'
import { useDispatch, useSelector } from 'react-redux'
import BlogExcerpt from '../features/blogger/BlogExcerpt'

const Home = () => {
    const dispatch =useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const errors = useSelector(getPostsError)
    useEffect(() =>{
        if(postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    },[dispatch, postsStatus])

    let content;
    if(postsStatus === 'loading'){
        content= <div className='center'>
            loading....
        </div>
    }else if(postsStatus === 'succeeded'){
        content = posts.map((post) => 
    <BlogExcerpt key={post.id} postId={post.id} post={post}/>)
    }else if(postsStatus === 'failed'){
        content = <p>failed {errors}</p>
    }
  return (
    <div className='container m-auto mt-4'>
        <div className='grid grid-cols-3 gap-4'>
           <div className='col-span-2 shadow-lg text-center pl-12 py-3'>
           <div>{content}</div>
           </div>
           <div className=''> <SidePanel /></div>
        </div>
    
   
    </div>
  )
}

export default Home