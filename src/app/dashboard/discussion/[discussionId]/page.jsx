"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUpCircle, ChevronDownCircle } from "lucide-react";
import React, { useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { singleDiscussion } from "./singleroomdata";

const SingleDiscussion = () => {
  const [questions, setQuestions] = useState(singleDiscussion);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to hold the selected question
  const [newMessage, setNewMessage] = useState(""); // State for the message input

  const createQuestion = (e) => {
    e.preventDefault();
    const input = new FormData(e.target);
    const newQ = input.get("quest");

    if (newQ.trim() === "") return; // Prevent adding empty questions

    const newQuestion = {
      id: Math.random(),
      discussion: newQ,
      messages: [],
    };

    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion); // Automatically select the new question
    e.target.reset(); // Reset form after submission
  };

  const handleAddMessage = () => {
    if (!selectedQuestion || newMessage.trim() === "") return;

    const updatedQuestions = questions.map((question) =>
      question.id === selectedQuestion.id
        ? {
            ...question,
            messages: [
              ...question.messages,
              {
                content: newMessage,
                upVote: 0,
                downVote: 0,
                user: "slashritesh", // Replace with actual user if available
              },
            ],
          }
        : question
    );

    setQuestions(updatedQuestions);
    setSelectedQuestion(
      updatedQuestions.find((q) => q.id === selectedQuestion.id)
    ); // Update selectedQuestion with the latest messages
    setNewMessage(""); // Clear the message input
  };

  return (
    <div>
      <div className="flex gap-5 px-10">
        {/* Sidebar for Questions */}
        <aside className="w-[400px] border rounded-xl p-5">
          <form method="POST" onSubmit={createQuestion} className="flex gap-5">
            <Input
              name="quest"
              placeholder="Enter question ?"
              className="p-3 mb-5"
            />
            <Button type="submit">Ask</Button>
          </form>
          <div className="space-y-2">
            {questions.map((data) => {
              return (
                <div
                  key={data.id}
                  className={`cursor-pointer bg-slate-100 text-sm flex items-center p-5 rounded-lg ${
                    selectedQuestion?.id === data.id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedQuestion(data)} // Set selected question
                >
                  <RiQuestionAnswerLine className="text-xl mr-5" />
                  {data.discussion}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Discussion Panel */}
        <div className="border flex-1">
          {selectedQuestion ? (
            <>
              <div className="bg-slate-100 flex items-center p-5 rounded-lg">
                <RiQuestionAnswerLine className="text-xl mr-5" />
                {selectedQuestion.discussion}
              </div>
              <div className="p-5 space-y-5">
                {selectedQuestion.messages.length > 0 ? (
                  selectedQuestion.messages.map((message, index) => (
                    <div
                      key={index}
                      className="p-5 flex flex-col gap-5 rounded-md border"
                    >
                      <p className="flex-1">{message.content}</p>
                      <div className="flex items-center gap-5">
                        <div className="flex gap-2 px-5 p-2 bg-slate-100 items-center rounded-full">
                          <ChevronUpCircle size={18} />
                          {message.upVote}
                        </div>
                        <div className="flex gap-2 px-5 p-2 bg-slate-100 items-center rounded-full">
                          <ChevronDownCircle size={18} />
                          {message.downVote}
                        </div>
                        <p className="w-fit p-2 px-5 bg-slate-100 rounded-full text-sm">
                          {message.user}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No messages yet.</p>
                )}
              </div>
              {/* Add Message Input */}
              <div className="p-5 flex gap-5">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <Button onClick={handleAddMessage}>Send Message</Button>
              </div>
            </>
          ) : (
            <div className="p-5 text-gray-500">
              Select a question to view its messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleDiscussion;
