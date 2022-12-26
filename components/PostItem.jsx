import React from 'react'
import Link from 'next/link';
import {urlFor} from '../sanity';

const PostItem = ({posts}) => {
  return (
    <div className="max-w-screen-2xl m-auto mt-24 ">
    
    {posts.map( (post) => (
      <Link href={`/post/${post.slug.current}`} key={post._id}>
        <div className='group flex flex-col gap-6 sm:flex-row items-center 
                        max-w-screen-lg mb-10 sm:mb-12 overflow-hidden border p-2'>
            <div className='flex flex-col'>
              <div className='flex items-center justify-start gap-6 ml-4 sm:ml-0'>
                <img className="h-12 w-12 rounded-full" 
                              src={urlFor(post.author.image).url()} alt=""/>
                <span>{post.author.name}</span>
              </div> 
              <div className='ml-4 sm:ml-0 sm:pr-6 flex flex-col justify-start gap-2'>
                <p className='text-xl sm:text-2xl font-bold'>{post.title}</p>
                <p>{post.description} by {post.author.name}</p>
                <p>{post.publishedAt }</p>
              </div>
            </div>
            <img src={urlFor(post.mainImage).url() } alt="" 
                  className='h-full w-full sm:h-50 sm:w-[300px] object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'/>
        </div>
        </Link>
      ))}
      
    </div> 
  )
}

export default PostItem