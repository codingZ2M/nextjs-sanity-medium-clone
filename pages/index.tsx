
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
    <div className="w-ful bg-[#FFC017] h-[650px]">
      <Head>
        <title>Medium Clone - Next.JS React Sanity Tailwind CSS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header/>
      
      <div className="max-w-screen-2xl m-auto  flex justify-between">
          <div className='flex flex-col space-y-8 space-x-6 sm:space-x-0 max-w-3xl mt-28'>
              <span className="text-8xl sm:text-9xl  font-serif pl-4">Stay curious.</span>
              <span className='text-3xl'>
                Discover stories, thinking, and expertise from writers on any topic.
              </span>
              <div className=''>
                    <span className='text-white text-2xl font-normal bg-black px-14 py-[10px] 
                          rounded-full'>
                      Start reading 
                    </span>
              </div>
          </div>

          <div className='hidden md:inline-flex mt-0'>
              <img src="banner.png"/>
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