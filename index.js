const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

// DB Config
const db = require('./config/keys').mongoURI;

// connect to mongoose
mongoose.connect(db).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/profile', profile);
app.use('/users', users);
app.use('/posts/', posts);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`System running on ${port}`));
