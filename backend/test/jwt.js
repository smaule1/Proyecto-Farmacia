import { should } from 'chai';
import { createToken, decodeToken } from '../utils/jwt.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './test/test.env' });

should();


describe('jwt', function () {
  describe('createToken()', function () {

    it('should return a token string signed with the private key', function () {
      const user = {
        _id: 1,
        rol: 'admin'
      };
      let token = createToken(user);
      token.should.be.a('string');
      let wrap = function () { jwt.verify(token, process.env.JWT_PRIVATE_KEY); }
      wrap.should.not.throw();
    });
  });

  describe('decodeToken()', function () {

    it('should return the decoded token', function () {
      const user = {
        _id: 1,
        rol: 'admin'
      };
      let token = createToken(user);
      decodeToken(token).should.include(user);
    });

    it('should return error when the token is signed with different key', function () {
      const user = {
        _id: 1,
        rol: 'admin'
      };
      const token = jwt.sign(
        {
          _id: user._id,
          rol: user.rol
        },
        'adfadsfsdafdsfsda',
        { expiresIn: "15m" }
      );
      let wrap = function () { decodeToken(token) }
      wrap.should.throw();
    });
  });
});