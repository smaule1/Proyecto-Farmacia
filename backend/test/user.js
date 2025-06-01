import { should, use } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import { start } from '../server.js';
import User from '../model/userModel.js';


// env variables
dotenv.config({ path: './test/test.env' });
// chai  config
const chai = use(chaiHttp)
should();


// Tests

describe('Log in /api/users/login', function () {
  let user = {
    nombreUsuario: "usuario de prueba",
    email: "test@email.com",
    password: "test1234",
    rol: "Usuario"
  };
  let loginCookie;

  before(async function () {
    const res = await chai.request.execute(start)
      .post('/api/users/registrar')
      .send(user);

    // user data in body
    res.body.should.have.property('data');
    res.body.data.should.have.property('user');
    user = res.body.data.user;
    // coookies in headers
    res.headers.should.have.property('set-cookie');
    res.headers['set-cookie'].should.be.length(1);
    const cookie = res.headers['set-cookie'][0].split(";")[0];
    cookie.split("=")[0].should.be.equal('userInfo');
    loginCookie = cookie;
  })

  after(async function () {
    await User.deleteMany({});
  });

  it('with email and password', async function () {
    const data = { email: 'test@email.com', password: 'test1234' }

    const res = await chai.request.execute(start)
      .post('/api/users/login')
      .send(data);

    //200 ok status  
    res.should.have.status(200);
    // user data in body
    res.body.should.have.property('data');
    res.body.data.should.have.property('user');
    res.body.data.user.should.deep.include(user);
    // cookies in headers        
    res.headers.should.have.property('set-cookie');
    res.headers['set-cookie'].should.be.length(1);
    const cookie = res.headers['set-cookie'][0].split(";")[0];
    cookie.split("=")[0].should.be.equal('userInfo');
  });

  it('with login cookie', async function () {
    const res = await chai.request.execute(start)
      .post('/api/users/login')
      .set('Cookie', loginCookie);

    //200 ok status  
    res.should.have.status(200);
    // user data in body
    res.body.should.have.property('data');
    res.body.data.should.have.property('user');
    res.body.data.user.should.deep.include(user);
    // cookies in headers        
    res.headers.should.have.property('set-cookie');
    res.headers['set-cookie'].should.be.length(1);
    const cookie = res.headers['set-cookie'][0].split(";")[0];
    cookie.split("=")[0].should.be.equal('userInfo');
  });
});