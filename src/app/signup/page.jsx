'use client'
import SignupForm from '../login/form/signup-form';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/navigation";
import { BaseApiUrl } from "@/utils/constanst";

export default function SignupPage() {
    const router = useRouter();
    
      // const clientId = "768974449019-c0slgah7in7rhlr13cs295t9esodjb3b.apps.googleusercontent.com";
      const clientId =
        "768974449019-60pn6e18b4grspfbhr7bs388k5g97sm2.apps.googleusercontent.com";
    
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
          router.push("/");
          // dispatch(setNotifyMassage('Login SuccessFully!'))
          // dispatch(setNotify(true));
        }
      };
    
      const onSignupFailure = () => {
        console.log("Some error are occuring please try again.");
      };

  return (
    <div className='justify-items-center'>
        <Card className="w-full max-w-md mt-10">
      <CardHeader>
        <div className="w-full flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create your account
        </h2>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <div className="grid grid-cols-1 gap-3 mt-5">
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

