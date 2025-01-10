import React from "react";
import NavBar from "@/components/NavBar";
import Home from "@/components/Home/home";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

const page = () => {
 
  return (
    <>
      <div className="overflow-x-hidden">
        <NavBar />
        <div className="ml-0 md:ml-20">
          <Home />
          <WhyChooseUs />
        </div>
      </div>
    </>
  );
};

export default page;
