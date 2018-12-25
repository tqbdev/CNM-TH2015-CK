const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const _ = require('lodash');

const {
  User
} = require('../models');
const config = require('../config/config');
const GoogleRecaptcha = require('../services/GoogleRecaptcha');

function jwtSignUser(user) {
  return jwt.sign({
      user
    },
    config.authencation.jwtSecret, {
      expiresIn: config.authencation.jwtExpiresIn
    }
  );
}

module.exports = {
  async userRegister(req, res) {
    try {
      const refreshToken = randtoken.uid(256);
      const passwordRandom = randtoken.generate(8);
      let bodyClone = _.clone(req.body);
      bodyClone.password = passwordRandom;
      console.log('TESTING', bodyClone);
      const user = await User.create(bodyClone);
      // TODO: Send mail with passwordRandom

      await user.update({
        refreshToken
      });
      const userJson = user.toJSON();
      delete userJson['refreshToken'];

      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
        refreshToken
      });
    } catch (err) {
      res.status(400).send({
        error: 'This email is already in use.'
      });
    }
  },

  async userLogin(req, res) {
    try {
      const {
        email,
        password,
        gCaptchaResponse
      } = req.body;

      const response = await GoogleRecaptcha.verity(gCaptchaResponse);
      if (!response.data.success) {
        return res.status(403).send({
          error: 'The google recaptcha was incorrect. Pls try again'
        });
      }

      const user = await User.findByPk(email);

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        });
      }

      const refreshToken = randtoken.uid(256);
      await user.update({
        refreshToken,
        coordinate: null,
        ready: false
      });

      const userJson = user.toJSON();
      delete userJson['refreshToken'];

      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
        refreshToken
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      });
    }
  },

  async userToken(req, res) {
    try {
      const {
        email,
        refreshToken
      } = req.body;
      const user = await User.findOne({
        where: {
          email,
          refreshToken
        }
      });

      if (!user) {
        return res.status(401).send({
          error: 'The information was incorrect'
        });
      }

      // const refreshToken = randtoken.uid(256)
      const userJson = user.toJSON();
      delete userJson['refreshToken'];
      // await user.update({refreshToken})

      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
        // refreshToken
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      });
    }
  },

  async userRevokeToken(req, res) {
    try {
      const {
        email,
        refreshToken
      } = req.body;
      const user = await User.findOne({
        where: {
          email,
          refreshToken
        }
      });

      if (!user) {
        return res.status(401).send({
          error: 'The information was incorrect'
        });
      }

      await user.update({
        refreshToken: null
      });

      res.send({
        msg: 'Revoke token successfully'
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to revoke token'
      });
    }
  }
};
