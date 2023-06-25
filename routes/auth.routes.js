const bcryptjs = require('bcryptjs');

const express = require('express')
const userRouter = express.Router()
const User = require('../models/User.model')
const { 
    getSignup,
    postSignup,
    getProfile,
    getLogin,
    postLogin,
} = require('../controllers/auth.controller')

const signup = (req,res)=>{
    res.render('auth/signup')
}

userRouter.get('/signup',signup)

//registro
userRouter.post('/signup',(req,res)=>{
    const userData = req.body;
//encry
const salt = bcryptjs.genSaltSync(12)
const encryptedPassword = bcryptjs.hashSync(userData.password,salt)
//mongo
User
.create({username: userData.username,password:encryptedPassword})
.then(savedUser=>{
    console.log('User',savedUser)
    //enviar a otra vistaq
    res.redirect(`/auth/profile/${savedUser._id}`)

})

})

userRouter.get('/profile/:userId',(req,res,next)=>{
    const {userId} = req.params
    User.findById(userId)
        .then(user=>{
                console.log(user) 
                res.render('user/profile',{username:user.username,password:user.password})

        })
        .catch(error=> next(error))

})




module.exports = userRouter