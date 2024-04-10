const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const auth = require('../midleware/auth');
const router = express.Router();


router.post('/api/signup', async (req,res,next)=>{
    try{
        const { name , email , profilePic} = req.body;
        let user = await User.findOne({
            email : email
        })
        if(!user){
            let user = new User({
                name : name,
                email : email,
                profilePic : profilePic
            })
            user = await user.save();
        }
        const  token = jwt.sign({ id:user._id  },"passwordKey");
        res.status(200).json({
            user : user, 
            token : token
        })
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

router.get('/',auth, async (req,res,next)=>{
    const user = await User.findById(req.user);
    res.status(200).json({
        user :  user,
        token : req.token 
    })

})



module.exports = router;