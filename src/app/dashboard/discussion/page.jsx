import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { RiTeamLine } from "react-icons/ri";
import { discussion } from "./data";

const DiscussionPage = () => {
  return (
    <main className="px-10">
      <div>
        <h1 className="text-xl mb-5 font-semibold">Discussion Channels</h1>
      </div>
      <div className="grid gap-5 grid-cols-3">
        {discussion.map((data, index) => {
          return <ChannelCard key={index} data={data} />;
        })}
      </div>
    </main>
  );
};

export default DiscussionPage;

const ChannelCard = ({ data }) => {
  return (
    <div className="p-8 border rounded-lg">
      <h1 className="text-xl mb-3 font-medium">{data.name}</h1>
      <p className="text-slate-400">{data.description}</p>
      <div className="flex my-5 gap-5">
        <p className="flex gap-3">
          <Users />
          {data.members}
        </p>
        <p>{data.createdby}</p>
      </div>
      <Link href={`/dashboard/discussion/${data.id}`}>
        <Button className="bg-blue-500 hover:bg-blue-700">Join Now</Button>
      </Link>
    </div>
  );
};
