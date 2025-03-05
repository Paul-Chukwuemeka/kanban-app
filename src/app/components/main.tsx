import React from "react";
import { useContext, useState, useEffect } from "react";
import { KanbanContext } from "./context";

const Main = () => {
  const { toDo, setToDo, inProgress, setInProgress, done, setDone } =
    useContext(KanbanContext);

  const [draggedTask, setDraggedTask] = useState<{
    taskName: string;
    projectName: string;
    priority: number;
    id: string;
  }>({ taskName: "", projectName: "", priority: 0, id: "" });
  const [dragTarget, setDragTarget] = useState<string>("");
  const [draggedFrom, setDraggedFrom] = useState<string>("");

  console.log(toDo);

  const handleDragEnd = () => {
    if (
      (draggedFrom === "toDo" && dragTarget === "inProgress") ||
      dragTarget === "done" ||
      dragTarget === "toDo"
    ) {
      setToDo(toDo.filter((task) => task.id !== draggedTask.id));
    }
    if (
      (draggedFrom === "inProgress" && dragTarget === "inProgress") ||
      dragTarget === "done" ||
      dragTarget === "toDo"
    ) {
      setInProgress(inProgress.filter((task) => task.id !== draggedTask.id));
    }
    if (
      (draggedFrom === "done" && dragTarget === "inProgress") ||
      dragTarget === "done" ||
      dragTarget === "toDo"
    ) {
      setDone(done.filter((task) => task.id !== draggedTask.id));
    }
    if (dragTarget === "inProgress") {
      setInProgress([...inProgress, draggedTask]);
    }
    if (dragTarget === "toDo") {
      setToDo([...toDo, draggedTask]);
    }
    if (dragTarget === "done") {
      setDone([...done, draggedTask]);
    }
  };

  useEffect(() => {
    console.log(inProgress);
  }, [inProgress]);

  return (
    <div className=" p-5 flex justify-around w-full max-w-[900px] bg-[#2B1887]">
      <div
        className=" bg-[#D5CCFF] p-4 rounded-lg flex flex-col gap-4"
        onDragOver={() => {
          setDragTarget("toDo");
        }}
        onDragExit={() => {
          setDragTarget("");
        }}
      >
        <h1 className="font-extrabold text-2xl  min-w-60 text-center">To Do</h1>
        {toDo.map((task, index) => (
          <div
            key={index}
            className="bg-white p-2  rounded-lg min-w-44"
            draggable
            onDragStart={() => {
              setDraggedFrom("toDo");
              setDraggedTask(task);
            }}
            onDragEnd={() => {
              handleDragEnd();
            }}
          >
            <h1>{task.taskName}</h1>
            <h2>{task.projectName}</h2>
            <h3>{task.priority}</h3>
          </div>
        ))}
      </div>
      <div
        className=" bg-[#D5CCFF] p-4 rounded-lg flex flex-col gap-4"
        onDragOver={() => {
          console.log("drag over");
          setDragTarget("inProgress");
        }}
        onDragExit={() => {
          setDragTarget("");
        }}
        onDragEnd={() => {
          handleDragEnd()
        }}
      >
        <h1 className="font-extrabold text-2xl min-w-60 text-center">
          In Progress
        </h1>
        {inProgress.map((task, index) => (
          <div key={index} className="bg-white p-2  rounded-lg min-w-44" draggable>
            <h1>{task.taskName}</h1>
            <h2>{task.projectName}</h2>
            <h3>{task.priority}</h3>
          </div>
        ))}
      </div>
      <div
        className=" bg-[#D5CCFF] p-4 rounded-lg flex flex-col gap-4"
        onDragOver={() => {
          setDragTarget("done");
        }}
        onDragExit={() => {
          setDragTarget("");
        }}
      >
        <h1 className="font-extrabold text-2xl min-w-60 text-center">Done</h1>
        {done.map((task, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Main;
