const { sendResponse } = require("../Helper/helper");
const ticketModel=require("../ticketModel")
let ticket={
    getApi: async (req, res) => {
        try{
            const result=await ticketModel.find();
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
      },
      PostApi:async (req, res) => {
        let {Tickettitle,Description,Tickettype,Ticketstatus,}=req.body
        try{
            let errArr=[]
            if (!Tickettitle){
                errArr.push("Tickettitle Requrired")
            }if(!Description){
                errArr.push("Description Requrired")    
            }if(!Tickettype){
                errArr.push(" Tickettype is Requrired")
            }
            if(!Ticketstatus){
                errArr.push("Email is Requrired")
            }
            if (errArr.length >0){
                res.send(sendResponse(false,null,"requird  data")).status(400)
            }else{
                let obj={Tickettitle,Description,Tickettype,Ticketstatus} 
         let ticketdata=new ticketModel(obj)
         await ticketdata.save()
         if (!ticketdata){
            res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
         }else{
            res.send(sendResponse(true,ticketdata,"save data succefull")).status(200)
        }
    }
}
catch(e){
    res.send(sendResponse(false,null,"Interbal Server Error")).status(404)
}
},   putApi:async (req, res) => {
    try {
        let id = req.params.id
        let result = await ticketModel.findById(id)
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400)
        } else {
            let updateResult = await ticketModel.findByIdAndUpdate(id, req.body,
                { new: true })
            if (!updateResult) {
                res.send(sendResponse(false, null, "Error")).status(400)
            } else {
                res.send(sendResponse(true, updateResult, "Updated Successfully")).status(200)
            }
        }
    } catch (err) {
        res.send(sendResponse(false, null, "Error")).status(404)
    }
}
}


module.exports = ticket;