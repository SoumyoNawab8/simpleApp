const express=require('express');
const router=express.Router();

// @route GET /profile/
// @desc Test profile route
// @access PUBLIC
router.get('/',(req,res)=> res.json({msg:"This is profile"}));

module.exports=router;
