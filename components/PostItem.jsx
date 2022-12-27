import React from 'react'
import Link from 'next/link';
import {urlFor} from '../sanity';

const PostItem = ({posts}) => {
  return (
    <div className="w-full mt-12 sm:mt-24 flex flex-col items-center">
    
    {posts.map( (post) => (
      <Link href={`/post/${post.slug.current}`} key={post._id}>
        <div className='group grid grid-cols-1 sm:grid-cols-2  items-center
                       w-full m-auto  mb-10 sm:mb-12 overflow-hidden border p-2'>
            <div className='flex flex-col '>
              <div className='flex items-center justify-start gap-6'>
                <img className="h-12 w-12 rounded-full" 
                              src={urlFor(post.author.image).url()} alt=""/>
                <span>{post.author.name}</span>
              </div> 
              <div className='flex flex-col justify-start gap-2'>
                <p className='text-2xl'>{post.title}</p>
                <p>By {post.author.name}</p>
                <p>{post.publishedAt }</p>
                <p className='w-full sm:w-[700px]'>{post.description}</p>
              </div>
            </div>
            <div className='w-full'>
              <img src={urlFor(post.mainImage).url() } alt="" 
                  className='mt-4 sm:mt-0 h-full w-full sm:h-80 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'/>
            </div>
        </div>
        </Link>
      ))}
      
    </div> 
  )
}

export default PostItem