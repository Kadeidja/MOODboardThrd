const mongooseModule = require('mongoose');
//const uniqueValidation = require('mongoose-unique-validator');

const authLoginUserSchema = new mongooseModule.Schema({
    ulname:{
        type: String,
        unique: true
    },
    ulemail:{
        type: String,
        unique: true
    },
    ulpswd:{
        type: String,
    }
});

//authLoginUserSchema.plugin(uniqueValidation);

module.exports = mongooseModule.model("UserValidation", authLoginUserSchema);
