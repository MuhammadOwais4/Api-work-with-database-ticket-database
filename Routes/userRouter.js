const express = require("express");
const route = express.Router();
const { sendResponse } = require("./models/Helper/helper");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


route.post("/signup", async (req, res) => {
  const { userName, Email, password } = req.body;
  const obj = { userName, Email, password };
  let requiredArr = ["userName", "Email", "password"];
  let errArr = [];

  requiredArr.forEach((x) => {
    if (!obj[x]) {
      errArr.push(x);
    }
  });

  if (errArr.length > 0) {
    res
      .send(sendResponse(false, null, "Some Fileds are Missing", errArr))
      .status(400);
    return;
  } else {
    let hashPassword = await bcrypt.hash(obj.password, 10);
    obj.password = hashPassword;

    const existingUser = await userModel.findOne({ Email });
    if (existingUser) {
      res
        .send(sendResponse(false, null, "This Email is Already Exist"))
        .status(403);
    } else {
      userModel.create(obj)
        .then((result) => {
          res.send(sendResponse(true, result, "User Saved Successfully"));
        })
        .catch((err) => {
          res
            .send(sendResponse(false, err, "Internal Server Error"))
            .status(400);
        });
    }
  }
});
route.post("/login", async (req, res) => {
  const { Email, password } = req.body;
  const obj = { Email, password };
  try{
  let result = await  userModel.findOne({ Email })
  if(result){
      let isConfirm = await bcrypt.compare(obj.password, result.password);
          if(isConfirm){
      var token = jwt.sign({ ...result }, process.env.SECURE_KEY,{expiresIn: "1h"});
            if(token) {
              res.send(sendResponse(true,{user:result , token}, "Token Confrimed"));
            }else{
              res.send(sendResponse(false,null, "Toeken is nt confrimed"));
            }

          }else{
        res.send(sendResponse(false,null, "Result Not found"));
          }

  }else{
        res.send(sendResponse(false,null, "Result Not found"));

  }

  }catch(e){
    console.log(e)
  }
    // .then(async (user) => {
    //   let isConfirm = await bcrypt.compare(obj.password, user.password);
    //   console.log(isConfirm);
    //   if (isConfirm) {
    //     var token = jwt.sign({ ...isConfirm }, process.env.SECURE_KEY , {expiresIn:"1h"});
    //     if(token){
    //     res.send(sendResponse(false,null, "Token not get"));

    //     }else{
    //       res.send(sendResponse(true,token, "Token  get"));

    //     }
    //     // res.send(sendResponse(true, user, "Login Successfully"));
    //   } else {
    //     res.send(sendResponse(false, null, "Credential Error"));
    //   }
    // })
    // .catch((err) => {
    //   res.send(sendResponse(false, err, "User Doesn't Exist"));
    // });
});
route.post("/");
route.get("/");
route.put("/");
route.delete("/");

module.exports = route;