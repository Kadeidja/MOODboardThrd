
const signInFunc = require('../controllers/authController') 


describe('Take input information', ()=>{
  
it('should return " The name is required " ',()=>{
    expect(signInFunc(!ulname)).toBe('The name is required')
})

it('should return " The password is required " ',()=>{
    expect(signInFunc(!ulpswd)).toBe('The password is required')
})
it('should return "The password must have more than 6 character " ',()=>{
    expect(signInFunc(!ulpswd.length < 6)).toBe('The password must have more than 6 character')
})

it('should return " The email is not valid " ',()=>{
    expect(signInFunc(!ulname)).toBe('The name is required')
})


})