const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
    Text:{
        type:String,
        require:true,
    },
});
const TodoModel =mongoose.model('todo',todoSchema)
module.exports=TodoModel;