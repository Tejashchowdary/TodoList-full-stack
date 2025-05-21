import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import './index.css'

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit=(id)=>{
    axios
    .put("http://localhost:5000/update/" +id)
    .then(() =>
    location.reload()
    )
    .catch((err) => console.log(err));
  }

  const handleDelete=(id)=>{
    axios
    .delete ("http://localhost:5000/delete/" +id)
    .then(() =>
    location.reload()
    )
    .catch((err) => console.log(err));
  }
  return (
    <div className="place-items-center">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        ToDo List
      </h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-500 text-center">
            No Record
          </h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div
            key={index}
            className="w-72 h-16 bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex items-center justify-between mt-4 group"
          >
            <div className="flex items-center gap-3" onClick={()=>handleEdit(todo._id)} >
              {todo.done ? 
              <BsFillCheckCircleFill></BsFillCheckCircleFill>
              :
              <BsCircleFill
                className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                size={20}
              />}
              <p className={todo.done ? "line_through":""} >{todo.task}</p>
            </div>
            <button className="text-red-400 hover:text-red-600 transition-colors duration-300">
              <MdDelete size={22} onClick={()=>handleDelete(todo._id)} />
            </button>
          </div> 
        ))
      )}
    </div>
  );
};

export default Home;

// '5oHYItPs9byq4t39' = mongodb password 
// "text-gray-700 font-medium" 