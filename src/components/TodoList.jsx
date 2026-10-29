import { useEffect, useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const [newTask, setNewTask] = useState();

  //Editing Values
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  }
  // this function set the edit index
  function editIndexfunc(task, index) {
    setEditIndex(index);
    setEditTask(task);
  }

  function updateTask(index) {
    const updateTaskValues = tasks.map((task, i) =>
      i === index ? editTask : task,
    );
    setTasks(updateTaskValues);
    cancelUpdateTask();
  }

  function cancelUpdateTask() {
    setEditIndex(null);
    setEditTask("");
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveUp(index) {
    if (index <= 0) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index - 1]] = [
      updatedTasks[index - 1],
      updatedTasks[index],
    ];
    setTasks(updatedTasks);
  }

  function moveDown(index) {
    if (tasks.length - 1 <= index) {
      return;
    }
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ];
    setTasks(updatedTasks);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex justify-center items-center bg-gray-700 p-5 rounded-2xl shadow-xl">
      <div className="flex   flex-col">
        <h1 className="text-center text-3xl font-bold my-5 text-orange-500">
          Todo List
        </h1>
        <div className="flex justify-center items-center">
          <input
            className="bg-gray-500 p-2 rounded-xl text-md shadow-xl focus:outline-orange-500 focus:outline-2 mx-5 w-sm"
            type="text"
            placeholder="Add task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key == "Enter") addTask();
            }}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 py-2 px-4 font-bold rounded-xl shadow"
          >
            Add
          </button>
        </div>
        <ul className="flex justify-center items-center flex-col my-5">
          {tasks.map((task, index) => (
            <li
              key={index}
              className=" bg-white text-black p-2 m-1 rounded-xl w-full"
            >
              {editIndex === index ? (
                <div className="flex m-2">
                  <input
                    className="flex-1 text-xl font-bold p-2 outline-0 "
                    type="text"
                    value={editTask}
                    autoFocus
                    onChange={(e) => setEditTask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        updateTask(index);
                      } else if (e.key == "Escape") {
                        cancelUpdateTask();
                      }
                    }}
                  />
                  <button
                    onClick={() => updateTask(index)}
                    className="m-1 bg-blue-500 py-1.5 px-2 rounded-xl text-white font-bold shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelUpdateTask}
                    className="m-1 bg-red-500 py-1.5 px-2 rounded-xl text-white font-bold shadow"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex m-2">
                  <span className="flex-1 text-xl font-bold p-2">{task}</span>
                  <div className="">
                    <button
                      onClick={() => editIndexfunc(task, index)}
                      className="bg-green-500 py-1.5 px-2 rounded-xl text-white font-bold shadow m-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="m-1 bg-red-500 py-1.5 px-2 rounded-xl text-white font-bold shadow"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => moveUp(index)}
                      className="m-1 bg-blue-500 py-1.5 px-2 rounded-xl text-white font-bold shadow"
                    >
                      Up
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      className="m-1 bg-blue-500 py-1.5 px-2 rounded-xl text-white font-bold shadow"
                    >
                      Down
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
