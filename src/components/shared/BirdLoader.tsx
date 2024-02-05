import React from 'react'

const BirdLoader = () => {
  return (
    <div className='flex-center flex-col w-full backdrop:blur-sm'>
        <img src="/public/assets/icons/birdloader.gif"
         alt="loader_svg"
         width={138}
         height={138} />
         <p className='subtle-semibold'><em>Loading..</em></p>
    </div>
  )
}

export default BirdLoader;