import React, { useState } from "react";
import axios from "axios"

const Create = () => {
  const [task, setTask]=useState();
  const handleAdd =()=>{
    axios.post("http://localhost:5000/add",{t:task})
    .then(()=>
      location.reload()
    )
    .catch(err=>console.log(err))

  }
  return (
   <div className="w-full flex justify-center mb-6">
  <div className="flex items-center gap-3">
    <input
      type="text"
      className="form-control w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      placeholder="Enter Task"
      onChange={(e)=>setTask(e.target.value)}
    />
    <button
      type="button"
      className="px-4 py-2 bg-black text-white border-2 border-black rounded-md hover:bg-gray-800 transition"
      onClick={handleAdd}
    >
      Add
    </button>
  </div>
</div>

  );
};

export default Create;
