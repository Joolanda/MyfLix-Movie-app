var jwtSecret = 'your_jwt_secret'; // same key as in JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // local passportfile

function generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // this is the username generated in the JWT
    expiresIn: '7d', // the token will expire in x days
    algorithm: 'HS256' // to encode JWT's values
  });
}

/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
