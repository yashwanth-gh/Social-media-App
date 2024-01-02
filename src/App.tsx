import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { AllUsers, CreatePost, EditPost, Explore, Home, Messages, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from "react-redux";
import { checkAuthUser } from "./redux/slices/authSlice";
import { useToast } from "./components/ui/use-toast";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast(); //* ShadCN-ui

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");

    if (
      cookieFallback === "[]" ||
      cookieFallback === undefined ||
      cookieFallback === null
    ) {
      navigate("/sign-in");
    } else {
      dispatch(checkAuthUser() as any);
      toast({
        description: "You are Signed-in!",
      });
    }
  }, []);

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
