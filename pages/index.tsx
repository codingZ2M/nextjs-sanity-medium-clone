
import Head from 'next/head'
import Header from '../components/Header'
import {sanityClient} from '../sanity';
import {Post} from '../typings'
import PostItem from '../components/PostItem'

interface Props {
  posts: [Post];
}

export default function Home ({posts}: Props) {
  console.log(posts)
  return (
    <div className=''>

    {/* Header Container */}
    <div className="w-ful bg-[#FFFFFF] h-full">
      <Head>
        <title>CODINGZ2M Blog </title>
      </Head>
      
      <Header/>
      
      <div className="max-w-screen-2xl m-auto  flex justify-between bg-black text-white h-[450px] sm:h-[550px]">
          <div className='flex flex-col items-start justify-center space-y-8 max-w-3xl font-verdana p-10'>
              <span className="text-5xl sm:text-6xl sm:font-bold">Get Travel Experiences & Inspirations!</span>
              <span className='text-xl'>Discover Places, Explore Adventure And Experiences.</span>
              <span className='text-white text-2xl font-normal border-2 border-[#FF2929] 
                                px-14 py-[10px] rounded-full'>
                      Start Exploring 
               </span>
          </div>

          <div className='hidden md:inline-flex mt-0'>
              <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
          </div>
      </div>

       {/* Post Items Container */}
       <PostItem posts={posts}/> 
    

    </div>

 </div>
  )
}

// Changes the home page into server side rendered page
/* getServerSideProps(): A method that tells the Next component to populate the props and render 
  into a static HTML page at run time.
*/
export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
    publishedAt,
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props:{ 
      posts,
    }
  }
};