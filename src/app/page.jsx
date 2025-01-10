


// const Page = () => {
//   return (
//     <div className="overflow-x-hidden">
//       <NavBar />
//       <div className="ml-0 md:ml-20">
//         <Home />
//         <WhyChooseUs />
//         <Banner {...BannerData} />
//         <Banner {...BannerData2} reverse={true} />
//         <FAQ />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Page;
import Footer from "@/components/Footer";
import Banner from "@/components/Home/Banner";
import FAQ from "@/components/Home/FAQ";
import Home from "@/components/Home/home";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import NavBar from "@/components/NavBar";
import React from "react";

const page = () => {
  const BannerData = {
    image: "/assets/study.jpg",
    tag: "Comprehensive Course Library",
    title:
      "Embrace the Freedom to Learn at Your Own Pace: Unlock a World of Learning Opportunities! ",
    subtitle:
      "At CodePatshala, we offer a vast and diverse range of courses designed to meet the needs of learners at all stages. Whether you’re looking to build foundational knowledge or enhance specialized skills, our library covers everything you need to succeed.",
    link: "#",
  };
  
  const BannerData2 = {
    image: "/assets/VR.jpg",
    tag: "VR Mock Interviews: Prepare for Success",
    title:
      "Step Into the Future of Interview Preparation with VR Mock Interviews: Gain Real-World Experience in a Virtual Environment!",
    subtitle:
      "Get ready for your dream job with our cutting-edge VR mock interviews. Immerse yourself in realistic virtual environments that simulate real-life interview scenarios. With our self-paced, interactive VR experience, you can practice your responses, improve your confidence, and receive valuable feedback — all from the comfort of your own space. Tailor your practice sessions to fit your schedule and prepare at your own pace, ensuring you're fully ready when the real interview comes.",
    link: "#",
  };
  return (
    <>
      <div className="overflow-x-hidden">
        <NavBar />
        <div className="ml-0 md:ml-20">
          <Home />
          <WhyChooseUs />
          <Banner {...BannerData} />
          <Banner {...BannerData2} reverse={true} />
          <FAQ />
        </div>
        
      </div>
    </>
  );
};

export default page;
