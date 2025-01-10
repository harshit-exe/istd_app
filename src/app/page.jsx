


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
import FAQ from "@/components/Home/FAQ";
import Home from "@/components/Home/home";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import NavBar from "@/components/NavBar";
import React from "react";

const page = () => {
 
  return (
    <>
      <div className="overflow-x-hidden">
        <NavBar />
        <div className="ml-0 md:ml-20">
          <Home />
          <WhyChooseUs />
          <FAQ />
        </div>
        
      </div>
    </>
  );
};

export default page;
