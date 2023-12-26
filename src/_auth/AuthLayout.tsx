import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
    {isAuthenticated ? (
      <Navigate to={"/"}/>
    ):(
      <>
      <img 
      src="/public/assets/images/auth_transparent.svg"
      alt="side-image"
      className='hidden xl:block h-screen w-40% object-cover bg-no-repeat' />
      <section className='flex flex-1 justify-center items-center flex-col py-10'>
        <Outlet/>
      </section>
      </>
    )}
    </>
    )
}

export default AuthLayout