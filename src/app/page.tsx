'use client'
import TaskInput from "./components/taskInput";
import Context from "./components/context";
import Main from "./components/main";
import { useContext } from "react";
import { KanbanContext } from "./components/context";
export default function Home() {

  const { addTask, setAddTask, } = useContext(KanbanContext)
  return (
    <div className="bg-[#2C43DD] flex flex-col gap-10 items-center justify-start p-10 min-h-screen">
    <Context>
      {addTask && <TaskInput />}
      <button className="p-2 border border-black rounded-lg w-full " onClick={() => setAddTask(!addTask)}>
        {addTask ? 'Close' : 'Add Task'}
      </button>
      <Main/>
    </Context>
    </div>
  );
}
