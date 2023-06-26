const mongoose=require('mongoose');
const StudentScheme=new mongoose.Schema({
  firstName:{
    type:String,
    require:true
},
LastName:{
    type:String,
},
Contact:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
Email:{
    type:String,
    require:true
},
Course:{
    type:Number,
    required:true
}
})
const studentModel=mongoose.model("Students",StudentScheme)
module.exports=studentModel;