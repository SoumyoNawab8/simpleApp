const express=require('express');
const router=express.Router();

// @route GET /posts/
// @desc Test posts route
// @access PUBLIC
router.get('/',(req,res)=> res.json({msg:"This is posts"}));

module.exports=router;
