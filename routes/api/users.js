const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput=require('../../validation/register');
const validateLoginInput=require('../../validation/login');

// Loading the user model folder
const User = require('../../models/User');
// @route GET /users/
// @desc Test user route
// @access PUBLIC
router.get('/', (req, res) => res.json({msg: "This is users"}));

// @route GET /users/register
// @desc register user
// @access PUBLIC
router.post('/register', (req, res) => {

const { errors, isValid } = validateRegisterInput(req.body);
// check valid or not
if(isValid){
  return res.status(400).json(errors);
}
else{
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      errors.email='Email id already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', // rating
        d: 'mm' // default
      });
      const newUser = new User({name: req.body.name, email: req.body.email, avatar, password: req.body.password});
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err)
            throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        })
      });
    }
  });
}
});

// @route GET /users/login
// @desc login user
// @access PUBLIC
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);
  // check valid or not
  if(isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email}).then(user => {
    // check for user
    if (!user) {
      errors.email='User not found'
      return res.status(404).json(errors);
    }
    // check for password
    bcrypt.compare(password, user.password).then(isEqual => {
      if (!isEqual) {
        errors.password='Password incorrect.'
        return res.status(400).json(errors);
      } else {
        // on Success
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        // Sign token
        jwt.sign(payload, keys.secretKey, {
          expiresIn: 3600
        }, (err, token) => {
          res.json({
            Success: true,
            Token: 'Bearer ' + token
          });
        });
        // res.json({msg:'Success'});
      }
    });
  });
});

// @route GET /users/:route_user:
// @desc route_user
// @access PRIVATE
router.get('/current',passport.authenticate('jwt',{session: false}),
(req,res)=>{
  res.json({id:req.user.id,name:req.user.name,email:req.user.email,avatar:req.user.avatar});
});

module.exports = router;
