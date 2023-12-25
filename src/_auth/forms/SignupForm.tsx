import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from '@/lib/validation'
import { z } from 'zod'
import Loader from '@/components/shared/Loader'
import { Link } from 'react-router-dom'
import authService from '@/lib/appwrite/auth'



const SignupForm = () => {

  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const newUser = authService.createAccount(values);
    console.log(newUser)
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col px-4 py-10 '>
        <div className='flex justify-center items-center'>
          <img src="/public/assets/images/logo.svg" alt="" />
          <h2 className='h3-bold md:h2-bold tracking-wide'>tweetbook</h2>
        </div>
        <h2 className='h4-bold md:h3-semibold pt-5 sm:pt-12 text-center'>Create a new tweetbook Account</h2>
        <p className='hidden md:block text-color-hunt-4 subtle-semibold md:small-regular'>Join, Connect, Tweet. Sign Up Instantly!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-5 gap-5  text-color-hunt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='text' className=' text-color-hunt-1' placeholder="Fullname" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='text' className=' text-color-hunt-1' placeholder="Username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" className=' text-color-hunt-1' placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" className=' text-color-hunt-1' placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='text-color-hunt-4 shad-button_primary'>
            {isLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : ("Signup")}
          </Button>

          <p className='text-small-regular text-color-hunt-4 text-center mt-2'>
            Already have an account?&nbsp;
            <Link to={"/sign-in"} className='text-primary-500 text-small-semibold underline'>
              clickhere
            </Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SignupForm