const passport = require('passport')

module.exports = {
  isStaffAuthenticated(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
      if (err || !user || !user.isStaff) {
        res.status(403).send({
          error: 'You do not have access to this resource'
        })
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  },

  isUserAuthenticated(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
      if (err || !user) {
        res.status(403).send({
          error: 'You do not have access to this resource'
        })
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  }

}
