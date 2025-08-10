import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import TodoModel from "./Models/Todo.js";


const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://tasks:5oHYItPs9byq4t39@tasks.rsxzeuo.mongodb.net/?retryWrites=true&w=majority&appName=Tasks")
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
  });

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome to work");
    
})
app.post("/add", (req,res) =>{
        const task=req.body.t;
        TodoModel.create({
            task:task
        }).then(result=>res.json(result))
        .catch(err=>res.json(err))
})

app.get("/get",(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true}, {new: true}) 
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message })); 
});

app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message })); 
})


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });