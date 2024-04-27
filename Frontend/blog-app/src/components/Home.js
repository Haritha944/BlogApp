import React, { useEffect } from 'react'
import SidePanel from './SidePanel'
import { fetchPosts, getPostsStatus, selectAllPosts, getPostsError, selectCategoryFilter } from '../features/blogger/bloggerSlice'
import { useDispatch, useSelector } from 'react-redux'
import BlogExcerpt from '../features/blogger/BlogExcerpt'
import { fetchCategories, selectAllCategories } from '../features/categories/categorieSlice'

const Home = () => {
    const dispatch =useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const errors = useSelector(getPostsError)
    const categoryFilter =useSelector(selectCategoryFilter)
    const categories = useSelector(selectAllCategories);
    useEffect(()=>{
        dispatch(fetchCategories())
    },[dispatch])

    useEffect(() =>{
        if(postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    },[dispatch, postsStatus])

    const filteredPosts = categoryFilter?posts.filter((post)=>post.category.some((categoryId)=> categories.find((category) =>category.id === categoryId)?.name ===categoryFilter)):posts;

    let content;
    if(postsStatus === 'loading'){
        content= <div className='center'>
            loading....
        </div>
    }else if(postsStatus === 'succeeded'){
        content = filteredPosts.map((post) => 
    <BlogExcerpt key={post.id} postId={post.id} post={post}/>)
    }else if(postsStatus === 'failed'){
        content = <p>failed {errors}</p>
    }
  return (
    <div className='container m-auto mt-4'>
        <div className='grid grid-cols-3 gap-4'>
           <div className='col-span-2 shadow-lg text-center pl-12 py-3'>
           <div className='container mx-auto grid grid-cols-2 gap-2'>{content}</div>
           </div>
           <div className=''> <SidePanel /></div>
        </div>
    
   
    </div>
  )
}

export default Home