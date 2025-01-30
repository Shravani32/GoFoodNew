const express=require("express");
const router=express.Router();

router.post("/foodData",async(req,res)=>{
    try{    
        res.send([global.food_data,global.food_category])
    }
    catch(err){
        console.log(err.message);
        res.send("Server Error");
    }
})

module.exports=router