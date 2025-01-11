"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUpCircle, ChevronDownCircle } from "lucide-react";
import React, { useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";

const page = () => {
  const [questions,setQiestions] = useState()

  return (
    <div>
      <div className="flex gap-5 px-10">
        <aside className="w-[400px] border rounded-xl p-5">
          <div className="flex gap-5">
            <Input placeholder="Enter question ?" className="p-3 mb-5" /><Button>Ask</Button>
          </div>
          <div>
            <div className="bg-slate-100 flex items-center p-5 rounded-lg">
              <RiQuestionAnswerLine className="text-xl mr-5" /> my UseState is
              not workin?
            </div>
          </div>
        </aside>
        <div className="border flex-1">
          <div className="bg-slate-100 flex items-center p-5 rounded-lg">
            <RiQuestionAnswerLine className="text-xl mr-5" /> my UseState is not
            workin?
          </div>
          <div className="p-5">
            <div className="p-5 flex flex-col gap-5 rounded-md border">
              <p className="flex-1">I know the code</p>
              <div className="flex items-center gap-5">
                <div className="flex gap-2 px-5 p-2 bg-slate-100 items-center rounded-full">
                  <ChevronUpCircle size={18} /> 8
                </div>
                <div className="flex gap-2 px-5 p-2 bg-slate-100 items-center rounded-full">
                  <ChevronDownCircle size={18} /> 8
                </div>
                <p className="w-fit p-2 px-5 bg-slate-100 rounded-full text-sm">
                  slashritesh
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 flex gap-5">
            <Input />
            <Button>Send Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
