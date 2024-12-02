const UserModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const {hashingThePswd, comparingThePswd} = require('../utils/auth')
const jswt = require('jsonwebtoken');
const express = require('express');
const appExpress = express();

appExpress.use(express.json());

const testLogin = (req,res) => {
    res.json('Test is working...')
};
//SIGN FUNCTION --------------------------------------------------------------------------------------------------------------------------------------------------
const signInFunc = async (req,res) =>{
    console.log('Données reçues pour SignInComp :', req.body);//ok
    try {
        const {ulname, ulemail, ulpswd} = req.body;
        //
        if(!ulname){
            return res.status(400).json({ error : 'The name is required'})
        } 
        //
        if (!ulemail || !ulemail.includes('@')) {
            return res.status(400).json({ error: 'not valid mail format' });
        }
        //
        if(!ulpswd || ulpswd.length < 6){
            return res.status(400).json({error : 'Password be must more than 6 character'});
        }
        //
        const existingMail = await UserModel.findOne({ulemail});
        if(existingMail){
            return res.status(400).json({ error : 'Email already taken'});
        }

        const hashedPswd = await hashingThePswd(ulpswd)
        if(!hashedPswd){
            console.log('The psswd cannot be hashed');
            return res.status(500).json({error: 'Hashing password fail'})
        }

        const newUserInDB = await UserModel({
            ulname,
            ulemail, 
            ulpswd : hashedPswd,
        })
        await newUserInDB.save() 
        console.log(`User ${ulname} created...`);

        return res.status(201).json({message: `User ${ulname} created...`})

    } catch (error) {
        console.error('Error in SignIn');
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error', error: error.message  });
    }
};
// LOGIN FUNCTION -------------------------------------------------------------------------------------------------------------------------------
    const logInFunc = async (req, res)=> {
        console.log('Données reçues pour logInFunc:', req.body);
        try {
            const {ulemail, ulpswd} = req.body;

            const user = await UserModel.findOne({ulemail});
            if(!user){
                return res.status(404).json({
                    error: 'User not found'
                })
            }
            if(!ulpswd){
                return res.status(400).json({
                    error: 'Where did the password go?'
                })
            }

            const matchPswd = await comparingThePswd(ulpswd, user.ulpswd)
            console.log('Password match')

            if (!matchPswd) {
                return res.status(401).json({ error: 'Invalid credentials' })
        }
            const token = jswt.sign(
                {email: user.ulemail, id: user._id, ulname: user.ulname}, 
                process.env.JSWT_SCRT,
                { expiresIn: '24h'}
            );
            res.cookie('token', token, { httpOnly: true }).status(200).json({
                success: 'Login successful',
                user: {
                    id: user._id,
                    name: user.ulname,
                    email: user.ulemail,
                },
        });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


module.exports = {
    testLogin,
    signInFunc,
    logInFunc
}