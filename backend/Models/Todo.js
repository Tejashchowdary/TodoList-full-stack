import mongoose from "mongoose";

const Todoschema=new mongoose.Schema({
    task:{
        type:String,
        required:true,
    },
    done:{
        type:Boolean,
        default:false
    },
});

const TodoModel=mongoose.model("todos", Todoschema);
export default TodoModel