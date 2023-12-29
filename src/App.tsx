import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from "react-redux";
import { checkAuthUser } from "./redux/slices/authSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const cookieFallback = localStorage.getItem("cookieFallback");
  //   // cookieFallback === null
  //   // cookieFallback === undefined
  //   if (
  //     cookieFallback === "[]"
  //   ) {
  //     navigate("/sign-in");
  //   }

  //   dispatch(checkAuthUser() as any);
  // }, []);

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
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
