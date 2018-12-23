const passport = require('passport')
const {
  User
} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  'jwt',
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authencation.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findByPk(jwtPayload.user.email)

      if (!user) {
        return done(new Error(), false)
      }

      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
