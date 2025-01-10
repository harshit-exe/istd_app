"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { BaseApiUrl } from "@/utils/constanst";

export default function page() {
  const router = useRouter();

  const clientId = "768974449019-c0slgah7in7rhlr13cs295t9esodjb3b.apps.googleusercontent.com";

  const onSignupSuccess = async (res) => {
    console.log(res.email);
    console.log(res.name);

    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: res.name, email: res.email,pic: res.picture }),
    });
    const json = await response.json();

    if (json) {
      localStorage.setItem("token", json.authToken);
      router.push("/");
    }
  };

  const onSignupFailure = () => {
    console.log("Some error are occuring please try again.");
  };
  return (
    <>
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
    </>
  );
}
