const express = require('express');
const cors = require('cors');
const UserModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const { hashingThePswd, comparingThePswd } = require('../utils/auth');
const jswt = require('jsonwebtoken');

const testLogin = (req, res) => {
    res.json('Test is working...');
};

// Sign Up Function
const signInFunc = async (req, res) => {
    console.log('Received data for SignIn:', req.body);
    try {
        const { name, email, password } = req.body;
        console.log('Name:', name, 'Email:', email, 'Password:', password);
        if (!name) {
            return res.status(400).json({ error: 'The name is required' });
        }
        if(!email || !email.include('@')){
            return res.status(400).json({error: 'Invalid Email'});
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password must be more than 6 characters' });
        }

        const existingMail = await UserModel.findOne({ email });
        if (existingMail) {
            return res.status(400).json({ error: 'Email already taken' });
        }

        const hashedPswd = await hashingThePswd(password);

        const newUserInDB = await UserModel.create({
            ulname: name,
            ulemail: email,
            ulpswd: hashedPswd,
        });

        console.log('User in going to be saved on the database' , newUserInDB)

        //await newUserInDB.save();
        return res.status(201).json(newUserInDB);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
};

// Log In Function
const logInFunc = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const matchPswd = await comparingThePswd(password, user.password);
        if (!matchPswd) {
            return res.status(401).json({ error: "Password doesn't match" });
        }

        const token = jswt.sign(
            { email: user.email, id: user._id, name: user.name },
            process.env.JSWT_SCRT,
            { expiresIn: '24h' }
        );
                res.cookie('token', token, { httpOnly: true }).status(200).json({message: 'Login Successfull', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
};

module.exports = {
    testLogin,
    signInFunc,
    logInFunc,
};
