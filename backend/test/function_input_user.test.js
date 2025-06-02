import { should, expect } from 'chai'
import { registrar, login, logout } from '../controller/userController.js'
import sinon from 'sinon'
import User from '../model/userModel.js'

should()

// Tests

// Register
describe('Registrar test', () => {
    //stub
    let saveStub
    beforeEach(() => {
        saveStub = sinon.stub(User.prototype, 'save').callsFake(function() {
            if(!this.nombreUsuario || !this.email || !this.password || !this.rol) {
                return Promise.reject(new Error("Must input required fields"))
            } else if(typeof this.nombreUsuario !== 'string' || typeof this.email !== 'string'
                || typeof this.password !== 'string' || typeof this.rol !== 'string') {
                return Promise.reject(new Error("Invalid field data type"))
            } else if(this.nombreUsuario.trim() === 0 || this.email.trim() === 0
                || this.password.trim() === 0 || this.rol.trim() === 0) {
                return Promise.reject(new Error("Fields must not be empty"))
            } else {
                return Promise.resolve({
                    _id: 'whatever',
                    nombreUsuario: this.nombreUsuario,
                    email: this.email,
                    password: this.password,
                    rol: this.rol
                })
            }
        })
    })
    afterEach(() => {
        saveStub.restore()
    })

    it('should return error on empty body', async () => {
        // mockr eq
        const req = {
        body: {}
        }

        // mock res
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await registrar(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.have.property('message')
    })

    it('return error when saving if required fields are missing', async function() {
        //mocks
        const req = {
            body: {email: "email@test.a", password:"2345", rol: "hola"}
        }
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await registrar(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.have.property('message')
    })

    it('should return error on whitespace', async function() {
        //mocks
        const req = {
            body: {nombreUsuario: "", email: "      ", password: " ", rol: "           "}
        }
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await registrar(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.have.property('message')
    })
})

// Log in
describe('Log in test', function() {
    //stub
    let findOneStub
    beforeEach(() => {
        findOneStub = sinon.stub(User, 'findOne').resolves(null)
    })
    afterEach(() => {
        findOneStub.restore()
    })
    it('should return error on empty body', async function() {
        //mocks
        const req = {
            body: {},
            cookies: {}
        }
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await login(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.be.an('object')
        expect(res.jsonData).to.have.property('errors')
        expect(res.jsonData.errors[0]).to.have.property('message')
    })
    
    it('should return error if params are missing', async function() {
        //mocks
        const req = {
            body: {nombreUsuario: "testUser", rol: "Usuario", email: "testUser@gmail.com"},
            cookies: {}
        }
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await login(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.be.an('object')
        expect(res.jsonData).to.have.property('errors')
        expect(res.jsonData.errors[0]).to.have.property('message')
    })

    it('should return error if params is empty', async function() {
        //mocks
        const req = {
            body: {password: "", email: "testUser@gmail.com"},
            cookies: {}
        }
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await login(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.be.an('object')
        expect(res.jsonData).to.have.property('errors')
        expect(res.jsonData.errors[0]).to.have.property('message')
    })
    it('should return error if params is whitespace', async function() {
        //mocks
        const req = {
            body: {password: "  ", email: " "},
            cookies: {}
        }
        const res = {
            statusCode: null,
            jsonData: null,
            cookieData: null,
            status(code) {
                this.statusCode = code
                return this
            },
            json(data) {
                this.jsonData = data
                return this
            },
            cookie(name, value, options) {
                this.cookieData = { name, value, options }
                return this
            }
        }

        await login(req, res)

        expect(res.statusCode).to.equal(400)
        expect(res.cookieData).to.be.null
        expect(res.jsonData).to.be.an('object')
        expect(res.jsonData).to.have.property('errors')
        expect(res.jsonData.errors[0]).to.have.property('message')
    })
})

// Log out
describe('Log out test', function() {
    it('check response and not much else', async function() {
        //mocks
        const res = {
            cookieName: null,
            cookieValue: null,
            cookieOptions: null,
            statusCode: null,

            cookie(name, value, options) {
                this.cookieName = name;
                this.cookieValue = value;
                this.cookieOptions = options;
                return this;
            },
            sendStatus(code) {
                this.statusCode = code;
                return this;
            }
        };

        await logout({}, res)

        expect(res.statusCode).to.equal(200)
        expect(res.cookieName).to.equal('userInfo');
        expect(res.cookieValue).to.equal('');
        expect(res.cookieOptions).to.deep.equal({
            maxAge: 1,
            httpOnly: true,
            sameSite: 'strict'
        });
    })
})