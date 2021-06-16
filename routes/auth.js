const express = require('express');
const router = express.Router();

const {signup, signin,signout,requireSignin} = require("../controllers/auth");
const {userSignupValidator} = require('../validator')

router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);

/*
//can be used to restrict any routes in future
router.get('hello',reqireSignin,(req,res)=>{
    res.send("/hello there");
})
*/
module.exports=router;