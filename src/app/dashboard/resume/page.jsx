'use client'
import ResumeBuilder from '@/components/Course/ResumeBuilder'
import { BaseApiUrl } from '@/utils/constanst'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {


    const router = useRouter();
  const [data, setData] = useState([])
  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK (e.g., 401 Unauthorized), handle it
      localStorage.removeItem('token');
      // router.push("/");
    }

    const json = await response.json();
    if (json) {
      console.log(json);
      if(json.error){
        localStorage.removeItem('token');
      router.push("/");
      }else{

        let newData = {
          
          userName: json?.user?.userName,
          userId: json.user.id,
          role: json.user.roleName,
          email: json.user.email
          
        }
        setData(newData)
      }

      // dispatch(setUser(json.user));
    }
  }


  useEffect(() => {
    fetchUser()
  }, [])




  return (
    <div className='w-[75vw]'>
        <ResumeBuilder />
    </div>
  )
}

export default page