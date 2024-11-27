const UserModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const {hashingThePswd, comparingThePswd} = require('../utils/auth')
const jswt = require('jsonwebtoken');


const testLogin = (req,res) => {
    res.json('Test is working...')
};
//Sign In Form Function
const signInFunc = async (req,res) =>{
    console.log('Données reçues :', req.body);
    try {
        const {name, email, password} = req.body;
        //
        if(!name){
            return res.status(400).json({ error : 'The name is required'})
        } 
        //
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'not valid mail format' });
        }
        //
        const existingMail = await UserModel.findOne({email});
        if(existingMail){
            return res.status(400).json({ error : 'Email already taken'});
        }
        // 
        if(!password || password.length < 6){
            return res.status(400).json({error : 'Password be must more than 6 character'});
        }

        const hashedPswd = await hashingThePswd(password)
 
        const newUserInDB = await UserModel({
            name,
            email, 
            password : hashedPswd,
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
        return res.status(201).json({message: `User ${name} created...`})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        console.log('Données reçues :', req.body);
        try {
            const {email, password} = req.body;

            const user = await UserModel.findOne({email});
            if(!user){
                return res.status(404).json({
                    error: 'User not found'
                })
            }
            if(!password){
                return res.status(404).json({
                    error: 'Where did the password go?'
                })
            }

            const matchPswd = await comparingThePswd(password, user.password)
           
            if (!matchPswd) {
                return res.status(401).json({ error: 'Invalid credentials' })
        }
            const token = jswt.sign({email: user.email, id: user._id, name: user.name}, process.env.JSWT_SCRT,{ expiresIn: '24h'});
            res.cookie('token', token, { httpOnly: true }).status(200).json({
                success: 'Login successful',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
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