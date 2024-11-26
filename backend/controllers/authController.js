const express = require('express')
const cors = require('cors')
const UserModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const {hashingThePswd, comparingThePswd} = require('../utils/auth')
const jswt = require('jsonwebtoken');


const testLogin = (req,res) => {
    res.json('Test is working...')
};
//Sign In Form Function
const signInFunc = async (req,res) =>{
    
    try {
        const {name, email, password} = req.body;
        //
        if(!name){
            return res.json({
                error : 'The name is required',
            })
        };
        // 
        if(!password || password.length < 6){
            return res.json({
                error : 'Password be must more than 6 character',
            })
        }
        //
        const existingMail = await UserModel.findOne({email});
        if(existingMail){
            return res.JSON.stringify({
                error : 'Email already taken',
            });
        }

        const hashedPswd = await hashingThePswd(password)
 
        const newUserInDB = await UserModel.create({
            name,
            email, 
            password : hashedPswd
        })
        /*const newUserDB = await new UserModel ({
        name:;
        email:;
        password:;
        
        })
        await newUserDB.save()        
        return res.json(`Le compte de ${name} à bien été crée`)
        */
        await newUserInDB.save() 
        return res.json (newUserInDB)

    } catch (error) {
        console.log(error);
    }
};


//Log Up Form Function
 /*
const logInFunc = async (req, res)=> {
   //const userWhoLog = UserModel;
    await UserModel.findOne({email: req.body.email})
    .then( UserModel =>
    {
        if (!existingMailWhoLog) {
            return res.json('Unknowned Mail.');
        }
    bcrypt.compare(req.body.password, UserModel.password)
    .then(valid =>{
        if(!valid){
            return res.json('WRONG!!!')
        }
        res.json('Succesfully connected',{
            userId : UserModel._id,
            token: jwt.sign(
             { userId: UserModel._id},
             'RANDOM_TOKEN_SECRET',
             {expiresIn: '24h'}   
            )
        }
    );
    })
    .catch (error =>
        res.status(500).json({ error}));})
        .catch(error => res.status(500).json({
            error
        }));
        
};
    /*try {
    } catch (error) {
        
    }*/
    const logInFunc = async (req, res)=> {
        try {
            const [email, password] = req.body;

            const user = await UserModel.findOne({email});
            if(!user){
                return res.json({
                    error: 'User not found'
                })
            }

            const matchPswd = await comparingThePswd(password, user.password)
            if (match) {
                jswt.sign({email: user.email, id: user._id, name: user.name}, process.env.JSWT_SCRT,{} , (err,token) => {
                    if(err) throw err;
                    res.cookie('token', token).json(user)
                })
                res.json({
                    success: `Password Match`
                })
            }if (!match) {
                res.json({
                    error: `Password Don't Match`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


module.exports = {
    testLogin,
    signInFunc,
    logInFunc
}