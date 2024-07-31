"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import { format } from "date-fns";
import { useState } from "react";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [placeholder, setPlaceholder] = useState("add to list");

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    setPlaceholder("add to list");
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9999);
  };

  const handleKeyUp = (key) => {
    if (key === "Enter" && newTodo) {
      const randomNumber = getRandomNumber();

      const newItem = {
        id: `item-${randomNumber}`,
        content: newTodo,
      };

      setTodo(todo.concat(newItem));

      setNewTodo("");
    }
  };

  const handleDelete = (id) => {
    if (id > -1) {
      setTodo((prevTodo) => prevTodo.filter((_, index) => index !== id));
    }
  };

  return (
    <div className="flex justify-center pt-40">
      <div className="max-w-sm w-full shadow-lg cursor-default bg-white pt-8 pr-8 pl-8 pb-4 rounded-lg opacity-80">
        <div className="flex justify-center bg-gray-200 rounded-3xl px-4 py-1 border-2 hover:scale-110 transition-all hover:border-blue-300">
          <Image
            className="object-cover rounded-full m-2"
            alt="avatar image"
            src="/day-of-the-dead.png"
            height={75}
            width={75}
          ></Image>
          <div className="w-full p-3">
            <p className="text-3xl text-gray-600">Todo List</p>
            <p className="text-sm text-gray-800">
              {format(new Date(), "MMMM d, yyyy")}
            </p>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-plus-circle"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </div>
          <input
            type="text"
            id="newTodo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyUp={(e) => handleKeyUp(e.key)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white"
            placeholder={placeholder}
          />
        </div>

        <ul className="block w-full pt-6">
          {todo?.map((item, index) => {
            return (
              <li
                key={item.id}
                className="w-full border-2 rounded-xl mt-2 hover:border-blue-300"
              >
                <input
                  id={index}
                  type="checkbox"
                  className="float-left block w-6 h-6 m-3"
                />
                <button
                  id={index}
                  onClick={() => handleDelete(index)}
                  className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105"
                >
                  x
                </button>
                <label htmlFor={index} className="block w-full p-3">
                  {item.content}
                </label>
              </li>
            );
          })}
        </ul>
        <Footer />
      </div>
    </div>
  );
}
