const express = require('express')

const UserModel = require('../models/authModel')

const testLogin = (req,res) => {
    res.json('Test is working...')
};

const signInFunc = async (req,res) =>{
    
    try {
        const {name, email , password} = req.body;
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
        };
        //
        const existingMail = await UserModel.findOne({email});
        if(existingMail){
            return res.json({
                error : 'Email already taken',
            })
        };

        const newUserInDB = await UserModel.create({
            name, email, password
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

module.exports = {
    testLogin,
    signInFunc
}