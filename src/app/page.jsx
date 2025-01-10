import React from "react";
import NavBar from "@/components/NavBar";
import Home from "@/components/Home/home";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

const page = () => {
 
  return (
    <>
      <div className="overflow-x-hidden">
        <NavBar />
        <Home/>
        <WhyChooseUs/>
      </div>
    </>
  );
};

export default page;
