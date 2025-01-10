"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { BaseApiUrl } from "@/utils/constanst";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import LoginForm from "@/components/Home/LoginForm";


export default function page() {
  const router = useRouter();

  const clientId = "976004726633-qd21qspr0t0hep43vup331of8aq1u8je.apps.googleusercontent.com";
  // 768974449019-60pn6e18b4grspfbhr7bs388k5g97sm2.apps.googleusercontent.com


  const onSignupSuccess = async (res) => {
    console.log(res.email);
    console.log(res.name);

    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: res.name, email: res.email }),
    });
    const json = await response.json();

    if (json) {
      localStorage.setItem("token", json.authToken);
      router.push("/dashboard");
    }
  };

  const onSignupFailure = () => {
    console.log("Some error are occuring please try again.");
  };
  return (
    <div className="justify-items-center">
      <Card className="w-full max-w-md mt-10">
        <CardHeader>
          <div className="w-full flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Sign in to your account
          </h2>
        </CardHeader>
        <CardContent>
          {/* <LoginForm /> */}
          <div className="grid grid-cols-1 gap-3 mt-5 justify-items-center w-full">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                buttonText="Signup With Google"
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  onSignupSuccess(decoded);
                  console.log(decoded);
                }}
                onError={onSignupFailure}
              />
            </GoogleOAuthProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
