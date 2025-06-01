import { should, use } from 'chai'
import chaiHttp from 'chai-http'
import dotenv from 'dotenv'
import { start } from '../server.js'
import User from '../model/userModel.js'
import bcrypt from "bcrypt";
import { getUser } from '../logic/userLogic.js'

// Chai and other stuff
dotenv.config({ path: './test/test.env' });
const chai = use(chaiHttp)
should()

// Test

// Register
describe('Register in /api/users/registrar', function() {
    let user = {
        nombreUsuario: "TestUser",
        email: "test@email.com",
        password: "test1234",
        rol: "Usuario"
    }
    let resultUser

    before(async function() {
        const res = await chai.request.execute(start)
            .post('/api/users/registrar')
            .send(user)
        
        // Save result user
        res.body.should.have.property('data')
        res.body.data.should.have.property('user')
        resultUser = res.body.data.user
    })

    after(async function() {
        await User.deleteMany({})
    })

    // Test with result data
    it('should save object correctly', async function() {
        resultUser.should.have.property('email').equal(user.email)
        resultUser.should.have.property('nombreUsuario').equal(user.nombreUsuario)
        resultUser.should.have.property('rol').equal(user.rol)
        resultUser.should.have.property('puntos').equal(0)
        
        resultUser.should.have.property('password')
        const isMatch = await bcrypt.compare(user.password, resultUser.password)
        isMatch.should.be.true
    })
})

// Log in
describe('Log In in api/users/login', function() {
    let user = {
        nombreUsuario: "TestUser",
        email: "test@email.com",
        password: "test1234",
        rol: "Usuario"
    }
    let resultUser

    before(async function() {
        const res = await chai.request.execute(start)
            .post('/api/users/registrar')
            .send(user)
        
        // Check user creation
        res.body.should.have.property('data')
        res.body.data.should.have.property('user')

        // Log in with user
        const loginData = { email: user.email, password: user.password }
        const res2 = await chai.request.execute(start)
            .post('/api/users/login')
            .send(loginData)
        
        // Save log in info
        res2.body.should.have.property('data')
        res2.body.data.should.have.property('user')
        resultUser = res2.body.data.user
    })

    after(async function() {
        await User.deleteMany({})
    })

    it('should return object correctly', async function() {
        resultUser.should.have.property('email').equal(user.email)
        resultUser.should.have.property('nombreUsuario').equal(user.nombreUsuario)
        resultUser.should.have.property('rol').equal(user.rol)
        resultUser.should.have.property('puntos').equal(0)
        
        resultUser.should.have.property('password')
        const isMatch = await bcrypt.compare(user.password, resultUser.password)
        isMatch.should.be.true
    })
})

// Log out
describe('Log out in api/users/logout', function() {
    let user = {
        nombreUsuario: "TestUser",
        email: "test@email.com",
        password: "test1234",
        rol: "Usuario"
    }
    let loginCookie
    let resultUser
    let dbData

    before(async function() {
        const res = await chai.request.execute(start)
            .post('/api/users/registrar')
            .send(user)
        
        // Check user creation
        res.body.should.have.property('data')
        res.body.data.should.have.property('user')
        resultUser = res.body.data.user

        // Cookie shennanigans
        res.headers.should.have.property('set-cookie');
        res.headers['set-cookie'].should.be.length(1);
        const cookie = res.headers['set-cookie'][0].split(";")[0];
        cookie.split("=")[0].should.be.equal('userInfo');
        loginCookie = cookie;

        // Log out with user
        const res2 = await chai.request.execute(start)
            .get('/api/users/logout')
            .set('Cookie', loginCookie)

        // Verify db user data
        resultUser.should.have.property('_id')
        dbData = await getUser(resultUser._id)
    })

    after(async function() {
        await User.deleteMany({})
    })

    it('should not modify db data', async function() {
        dbData.should.have.property('email').equal(user.email)
        dbData.should.have.property('nombreUsuario').equal(user.nombreUsuario)
        dbData.should.have.property('rol').equal(user.rol)
        dbData.should.have.property('puntos').equal(0)
        
        dbData.should.have.property('password')
        const isMatch = await bcrypt.compare(user.password, dbData.password)
        isMatch.should.be.true
    })
})

