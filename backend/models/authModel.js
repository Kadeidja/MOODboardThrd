const mongooseModule = require('mongoose');
//const uniqueValidation = require('mongoose-unique-validator');

const authLoginUserSchema = new mongooseModule.Schema({
    ulname:{
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    ulemail:{
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    ulpswd:{
        type: String,
        required: [true, 'Passord is required']
    } 
}, 
    {timestamps: true });

//authLoginUserSchema.plugin(uniqueValidation);

module.exports = mongooseModule.model("UserValidation", authLoginUserSchema);
