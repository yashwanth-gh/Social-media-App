import Loader from '@/components/shared/Loader';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import React from 'react'

const Home = () => {

  const {data:posts,isPending:isPostLoading,isError:isPostError} = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold'>Your feed</h2>
          {isPostLoading && !posts?(<Loader/>
          ):(
            <ul className='flex flex-col flex-1 gap-8 w-full'>
              {
              posts?.documents.map((post:Models.Document)=>(
                <li><img src={post.imageUrl} alt="" width={400} height={400}/></li>
              ))
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home