const { sendResponse } = require("../Helper/helper");
const studentModel = require("../studentModel");

let student={
    getApi: async (req, res) => {
        try{
            const result=await studentModel.find();
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
        let {firstName,LastName,Contact, password,Email,Course}=req.body
    try{
        let errArr=[]
        if (!firstName){
            errArr.push("firstname Requrired")
        }if(!Contact){
            errArr.push("Contact Requrired")    
        }if(! password){
            errArr.push(" password is Requrired")
        }
        if(!Email){
            errArr.push("Email is Requrired")
        }
        if (!Course) {
            errArr.push("Required : Course")
        }
        if (errArr.length >0){
            res.send(sendResponse(false,null,"requird  data")).status(400)
        }else{
            let obj={firstName,LastName,Contact, password,Email,Course}
            let studentdata=new studentModel(obj)
            await studentdata.save()
            if (!studentdata){
                res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
            }else{
                res.send(sendResponse(true,studentdata,"save data succefull")).status(200)
            }
        }
    }
    catch(e){
        res.send(sendResponse(false,null,"Interbal Server Error")).status(404)
    }
    },
    putApi:async (req, res) => {
        try {
            let id = req.params.id
            let result = await studentModel.findById(id)
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(400)
            } else {
                let updateResult = await studentModel.findByIdAndUpdate(id, req.body,
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

module.exports = student