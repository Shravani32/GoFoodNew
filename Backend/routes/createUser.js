const express=require("express")
const router=express.Router();
const User=require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const jwtsecret="mkcnjwnhuqghuqyuuhdjvbaljbdhlbvhdb"

router.post('/createuser',
    [
        body('email').isEmail(),
        body('password',"Incoreect Password").isLength({min:5}),
        body('name').isLength({min:5})
    ],

    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array()});
        }
        const salt=await bcrypt.genSalt(10);
        let securePassword=await bcrypt.hash(req.body.password,salt);

    try{
         await User.create({
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location,
         });

         res.status(200).json({
            success:true,
            message:"User created successfully"
         })
    }

    catch(err){
       console.log(err);
       res.status(500).json({
        success:false,
       })
    }
})

router.post("/loginuser",
   [
      body('email').isEmail(),
      body('password',"Incoreect Password").isLength({min:5}),
  ],

   async(req,res)=>{
      const errors=validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array()});
        }
   let email=req.body.email;
   try{
        let userData=await User.findOne({email});

        if(!userData){
         return res.status(404).json({
            message:"User not found,try using correct credentials!"
         })
      }

      const pwdCompare=await bcrypt.compare(req.body.password,userData.password)

      if(!pwdCompare){
         return res.status(404).json({
            message:"User not found,try using correct credentials!"
         })
      }

      const data={
         user:{
            id:userData._id
         }
      }

      const authToken=jwt.sign(data,jwtsecret)

      return res.status(200).json({
         success:true,
         authToken:authToken
      })
   }
   catch(err){
      console.log(err);
      return res.status(500).json({
         success:false,
      })
   }
})

module.exports=router;