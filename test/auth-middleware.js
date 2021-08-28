const expect =require('chai').expect
const authMiddleware = require('../middleware/is-auth')
const jwt = require('jsonwebtoken')

describe('Auth middleware', function () {
    it('should throw an error if no authorization header is present', function () {
        const req = {
            get: function () {
                return null
            }
        }
        expect(authMiddleware.bind(this,req, {}, () => { })).to.throw('Not authenticated')
    })
    
    it('should throw an error if authorization header is only one string', function () {
        const req = {
            get: function () {
                return 'xyz'
            }
        }
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()
    })
    it('should throw an error incase token cannot be verified', function () {
        const req = {
            get: function () {
                return 'Bearer xyz'
            }
        }
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()
    })
    it('should yield a userid after decoding the token', function () {
        const req = {
            get: function () {
                return 'Bearer xyz'
            }
        }
        jwt.verify = function () {
            return {userId:'abc'}
        }
        authMiddleware(req,{},()=>{})
        expect(req).to.have.property('userId')
    })
})

