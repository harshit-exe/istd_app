import React from "react";
import NavBar from "@/components/NavBar";
import Home from "@/components/Home/home";

const page = () => {
 
  return (
    <>
      <div className="overflow-x-hidden">
        <NavBar />
        <Home/>
      </div>
    </>
  );
};

export default page;
