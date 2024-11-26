const cryptor = require('bcrypt');
const hashingThePswd = (password) => {
    return new Promise((resolve, reject) =>
    {
        cryptor.genSalt(12,(err, salt) => {
            if(err){
                reject(err)
            }
            cryptor.hash(password, salt, (err, hash) => {
                if(err){
                    reject(err)
                }
                resolve(hash)

            })
        })
    })
}

const compraringThePswd = (password, hashed) =>{
    return cryptor.compare(password, hashed)
}

module.exports = {
    hashingThePswd,
    compraringThePswd
}