import React from "react";
import NavBar from "@/components/NavBar";
import Home from "@/components/Home/home";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const Benefits = [
  {
    title: "Accessible Learning Anywhere",
    description:
      "Learn from the comfort of your home or campus, no matter where you are in India, including tier 3 colleges.",
  },
  {
    title: "Personalized Learning Experience",
    description:
      "AI adapts to your learning pace, offering customized lessons to match your strengths and weaknesses.",
  },
  {
    title: "Interactive and Engaging Content",
    description:
      "Enjoy immersive content with virtual simulations, real-time assessments, and interactive modules designed to enhance engagement.",
  },
  {
    title: "Affordable Education",
    description:
      "Access high-quality education at a fraction of the cost of traditional methods, making learning affordable for all.",
  },
  {
    title: "Scalable and Flexible",
    description:
      "No matter your schedule, learn at your own pace with the flexibility to study anytime, anywhere.",
  },
  {
    title: "Up-to-date Curriculum",
    description:
      "Stay ahead of the curve with constantly updated courses that cover the latest trends and technologies.",
  },
];

const page = () => {
  return (
    <>
      <div className="">
        <NavBar />
        <section className="px-20 flex justify-center items-center flex-col">
          <h1 className="text-4xl text-center font-medium mt-10 capitalize">
            Learn Smarter with AI-Powered <br /> Virtual Education Anywhere in
            India
          </h1>
          <p className="w-[60ch] my-10 text-center">
            Unlock AI-powered education for all, bringing quality learning to
            every corner of India, including tier 3 colleges. Learn anytime,
            anywhere, and upgrade your skills with ease!
          </p>
          <div className="flex gap-5">
            <Button variant={"secondary"} className="p-6 text-base">
              <PlayCircle className="text-2xl" /> Watch demo
            </Button>
            <Button className="p-6 text-base">Start Exploring</Button>
          </div>
          <div className="py-10 flex gap-5">
            <div className="h-[300px] relative rounded-lg bg-blue-500 border w-[300px]">
              <Image
                src={"/student2.jpg"}
                alt="collegestudent"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl shadow-sm"
              />
            </div>
            <div className="h-[300px] relative rounded-lg bg-blue-500 border w-[300px]">
              <Image
                src={"/student1.jpg"}
                alt="collegestudent"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl shadow-sm"
              />
            </div>
            <div className="h-[300px] relative rounded-lg bg-blue-500 border w-[300px]">
              <Image
                src={"/student3.jpg"}
                alt="collegestudent"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl shadow-sm"
              />
            </div>
            <div className="h-[300px] relative rounded-lg bg-blue-500 border w-[300px]">
              <Image
                src={"/student4.jpg"}
                alt="collegestudent"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-sm"
                objectPosition="center"
              />
            </div>
          </div>
        </section>

        <section className="my-32 px-20">
          <h1 className="text-center font-medium text-4xl">
            Benefits of Our AI-Powered Platform <br />
            for Every Student
          </h1>
          <div className="grid gap-8 my-10 grid-cols-3 justify-center">
            {Benefits.map((data, index) => {
              return (
                <div
                  className="p-10 border rounded-xl hover:bg-slate-100"
                  key={index}
                >
                  <h3 className="text-xl mb-5 font-medium">{data.title}</h3>
                  <p className="text-slate-500">{data.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="my-20 flex items-center gap-16 px-20">
          <div className="flex-1">
            <p className="font-medium p-2 rounded-full text-sm px-5 mb-5 bg-slate-200 w-fit">
              Affordable Education to Tier 3 student
            </p>
            <h3 className="text-4xl mb-10 font-medium">
              A Groundbreaking Initiative to Empower Education Across India
            </h3>
            <p>
              Our mission is to make quality education accessible to every
              student across India, especially in tier 3 colleges. By leveraging
              AI-powered tools, we aim to bridge the educational gap, enabling
              learners to thrive regardless of their location. Join us in
              transforming the learning experience, empowering students with the
              skills they need for a successful future.
            </p>
          </div>
          <div className="flex-1 flex gap-5">
            <div className="h-[500px] w-[400px] relative rounded-xl bg-blue-200">
              <Image
                src={"/campus1.jpg"}
                alt="campus student"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-sm"
                objectPosition="center"
              />
            </div>
            <div className="h-[500px] w-[400px] relative rounded-xl bg-blue-200">
              <Image
                src={"/campus2.jpg"}
                alt="campus student"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-sm"
                objectPosition="center"
              />
            </div>
          </div>
        </section>
        <section></section>
        <section className="mx-20 p-20 bg-slate-50 rounded-2xl mb-10">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl text-blue-600 font-semibold">Campus++</h1>
              <p className="mt-5">Padega India Tabhi To badega India!!</p>
              <p>campusPlus@gmai.com</p>
            </div>
            <div>
              <h1 className="text-xl font-medium mb-3">Quick Links</h1>
              <div>
                <p>Home</p>
                <p>Course</p>
                <p>Ai Labs</p>
                <p>Resume Builder</p>
                <p>Roadmap generator</p>
              </div>
            </div>
            <div className="border p-8 rounded-xl border-black">
              <h1 className="text-xl font-medium">Subscibe Our New Letter</h1>
              <p className="w-[40ch] my-2 text-sm">
                Get job opportunities and intership offers directly on your
                email, start india to explore education from anywhere india
              </p>
              <div className="flex gap-5">
                <Input />
                <Button>Submit</Button>
              </div>
            </div>
          </div>
          <div></div>
        </section>
      </div>
    </>
  );
};

export default page;
