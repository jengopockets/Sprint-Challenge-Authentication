const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // implement login
});

function getJwt(user) {
  const payload = {
    subject:user.id,
    username: user.username,
    jwtid: 1,
  };
  const options = {
    expiresIn: '8h',
  }
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
