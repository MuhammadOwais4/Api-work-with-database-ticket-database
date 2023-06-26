const express = require("express")
const route = express.Router();
const courseModel=require('./models/courseModel');
const {sendResponse} = require("./models/Helper/helper");
//Get daTA BY
route.get('/', async (req, res) => {
    try{
        const result=await courseModel.find();
        if (!result ){
           res.send(sendResponse(false,null,"data not found"))
            .status(404);
        }else{
            res.send(sendResponse(true,result))
        }
    }catch(err){
        console.log(err)
        res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
    }
 });
//
route.get('/:id', (req, res) => {
    res.send("Get all course Data");
});
route.post('/',async (req, res) => {
    let {Name,Duration,ShortName,Fees}=req.body
try{
    let errArr=[]
    if (!Name){
        errArr.push("Name Requrired")
    }if(!Duration){
        errArr.push("Duration Requrired")
    }if(!ShortName){
        errArr.push(" shortname  Requrired")
    }if(!Fees){
        errArr.push("Fees  Requrired")
    }
    if (errArr.length >0){
        res.send(sendResponse(false,null,"requird  data")).status(400)
    }else{
        let obj={Name,Duration,ShortName,Fees}
        let coursedata=new courseModel(obj)
        await coursedata.save()
        if (!coursedata){
            res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
        }else{
            res.send(sendResponse(true,coursedata,"save data succefull")).status(200)
        }
    }
}
catch(e){
    res.send(sendResponse(false,null,"Interbal Server Error")).status(404)
}
});
route.put('/:id', (req, res) => {
    res.send("Edit  course Data");
});
route.delete('/:id', (req, res) => {
    res.send("Delete course Data");
});
module.exports = route;