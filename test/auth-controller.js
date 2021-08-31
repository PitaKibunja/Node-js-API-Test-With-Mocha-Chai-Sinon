const expect = require('chai').expect
const sinon = require('sinon')
const mongoose=require('mongoose')
const User=require('../models/user')
const AuthController = require('../controllers/auth')
 
describe('Auth Controller-login', function () {
    it('should throw an error with code 500 if accessing the database fails', function (done) {
        sinon.stub(User, 'findOne')
        User.findOne.throws()
        const req = {
            body: {
                email: 'pita@dapin.com',
                password:'tester.com'
            }
        }
        AuthController.login(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error')
            expect(result).to.have.property('statusCode', 500)
            done()
        })
        User.findOne.restore()
    })
    it('should send a response with a valid user status for an existing user', function () {
    mongoose.connect(
        'mongodb+srv://pita:DJRqnzsNtyzgtp2k@cluster0.0thoj.mongodb.net/testdatabase?retryWrites=true&w=majority'
        )
        .then(result => {
            const user = new User({
                email: 'test@test.com',
                password: 'tester',
                name: 'Test',
                posts:[]
            })
            return user.save()
        })
        .then(() => {
            
        })
        .catch(err => console.log(err));
        })
})
