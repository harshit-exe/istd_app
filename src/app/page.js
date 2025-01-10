import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'
import Home from '@/components/Home/home'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import Img1 from "../assets/banner1.png";
import Img2 from "../assets/banner2.png";
import Banner from '@/components/Home/Banner'


const BannerData = {
  image: Img1,
  tag: "Learn at Your Own Pace",
  title:
    "Embrace the Freedom to Learn at Your Own Pace: Tailor Your Educational Journey to Fit Your Unique Schedule and Goals! ",
  subtitle:
    "Experience the freedom and flexibility to learn at your own pace, allowing you to tailor your educational journey to fit your unique schedule, learning preferences, and personal goals. With our self-paced courses, you can take the time to thoroughly grasp complex concepts, revisit materials as needed, and progress through the curriculum without the pressure of strict deadlines.",
  link: "#",
};

const BannerData2 = {
  image: Img2,
  tag: "VR Mock Interviews: Prepare for Success",
  title: 
    "Step Into the Future of Interview Preparation with VR Mock Interviews: Gain Real-World Experience in a Virtual Environment!",
  subtitle: 
    "Get ready for your dream job with our cutting-edge VR mock interviews. Immerse yourself in realistic virtual environments that simulate real-life interview scenarios. With our self-paced, interactive VR experience, you can practice your responses, improve your confidence, and receive valuable feedback — all from the comfort of your own space. Tailor your practice sessions to fit your schedule and prepare at your own pace, ensuring you're fully ready when the real interview comes.",
  link: "#",
};

const page = () => {
  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <div className='ml-0 md:ml-20'>
        <Home />
        <WhyChooseUs />
        <Banner {...BannerData} />
        <Banner {...BannerData2} reverse={true} />
      </div>
      <Footer />
    </div>
  )
}

export default page