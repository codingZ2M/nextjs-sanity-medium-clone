import { GetStaticProps } from 'next';
import React, { useState } from 'react'
import Header from '../../components/Header';
import {sanityClient, urlFor} from '../../sanity';
import {Post} from '../../typings'
import PortableText from 'react-portable-text';
import {useForm, SubmitHandler} from 'react-hook-form';

interface Props {
    post: Post;
}
interface FormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}


const Post = ({post}: Props) => {
    console.log(post)
   
    const [submitted, setSubmitted] = useState(false);
  const {register, handleSubmit, formState:{errors}} = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> =  (data) => {
     fetch('/api/createComment', {
        method:'POST',
        body: JSON.stringify(data),
    }).then( () => {
        console.log(data);
        setSubmitted(true);
    }).catch( (error) => {
        console.log(error);
        setSubmitted(false);
    })
  }

  return (
    <main >
       <Header/>
       <img src={urlFor(post.mainImage).url()} alt="" className='w-full h-52 object-cover'/>
       <article className='max-w-5xl mx-auto p-5'>
            <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
            <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>

            <div className="flex items-center space-x-2">
                <img src={urlFor(post.author.image).url()} alt="" className='h-10 w-10'/>
                <p className="font-extralight text-sm">
                    Post By <span className='text-red-600'>{post.author.name}</span> - Published at 
                    {new Date(post._createdAt).toLocaleString()}
                </p>
            </div>

            <div className='mt-8'>
                <PortableText   dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
                                projectId= {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                                content= {post.body}
                                serializers={
                                   {
                                    h4: (props: any) => <h4 className='text-xl font-bold my-5'  {...props}/>
                                   } 
                                }
                 />
            </div>
       </article>

       {/* Comments Section */}
       <hr className='mt-10 max-w-md sm:max-w-2xl my-5 mx-auto border border-[#FFC017]'/>
       {submitted ? (
        <div className="flex flex-col py-6 my-10 bg-[#FFC017] text-white max-w-2xl mx-auto p-4"> 
              <h1 className='text-3xl font-bold'>Thank you for your comment!</h1>
              <p>Your comment will be appeared below, once it has been approved!</p>
        </div>
          
       ): (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
            <span className="text-gray-600">Enjoyed this article?</span>
            <h3 className='text-2xl font-bold mb-3'>Leave a comment below:</h3>

            {/* This register method allows you to register an input or select element and apply validation rules to React Hook Form */}
             <input
                {...register("_id")}
                type="hidden"
                name="_id"
                value={post._id}
            /> 

            <label className="block mb-5">
                <span className="text-gray-600">Name</span>
                <input placeholder="Name" type="text" 
                         {...register("name", {required: true}) }
                        className="shadow border rounded py-2 px-3  mt-1 block w-full outline-none focus:ring-2 ring-[#FFC017]"/>
            </label >
            <label className="block mb-5">
                <span className="text-gray-600">Email</span>
                <input placeholder="Email" type="email"
                        {...register("email", {required: true}) }
                       className="shadow border rounded py-2 px-3 mt-1 block w-full outline-none focus:ring-2 ring-[#FFC017]"/>
            </label>
            <label className="block mb-5">
                <span className="text-gray-600">Comment</span>
                <textarea placeholder="Comments" rows={8}
                        {...register("comment", {required: true}) }
                        className="shadow border rounded py-2 px-3 mt-1 block w-full outline-none focus:ring-2 ring-[#FFC017]"/>
            </label>

             {/* Validation Errors If Validation Fails!*/}
            <div className='flex flex-col p-5'>
                {errors.name && (
                    <span className='text-red-500'>Name Field is Required</span>
                )}
                {errors.email && (
                    <span className='text-red-500'>Email Field is Required</span>
                )}
                {errors.comment && (
                    <span className='text-red-500'>Comment Field is Required</span>
                )}
            </div>                   
             <input type="submit" className="shadow bg-[#FFC017] hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded cursor-pointer"/>       
        </form>
       )}
       
       {/* Comments Section */}
       <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto space-y-2' >
          <h1 className='text-4xl'>Comments</h1>
          <hr className='pb-2'/>
            {post.comments.map( (comment) => (
                <p>
                    <span className='text-[#FFC017]'>{comment.name}: </span>
                    {comment.comment}
                </p>
                
            ))}
       </div>
    </main>
  )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"] {
        _id,
        slug {
            current
        }
    }`;

  const  posts = await sanityClient.fetch(query);

  const paths = posts.map( (post: Post) => ({
    params: {
             slug:post.slug.current
            }
  }));
  return {
    paths,
     // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
    fallback: "blocking",  // can also be true or 'blocking'
  };
};


/* getStaticProps(): A method that tells the Next component to populate props and render into 
    a static HTML page at build time. 
*/
export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
       _createdAt,
       title,
       author -> {
        name,
        image
       },
       'comments': *[
         _type == "comment" &&
         post._ref == ^._id &&
         approved == true
       ],
       description,
       mainImage,
       slug,
       body
    }`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if(!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60, // After 60 seconds, it will update the old cached version
    }
}




