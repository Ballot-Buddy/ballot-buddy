const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const buddyRouter = require('./routes/buddyRouter');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

// Static files
app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

// Cookie Parser
app.use(cookieParser());

// Parses incoming JSON bodies
app.use(express.json());

// Connect to DB
let url = 'mongodb+srv://'
url += process.env.MONGODB_USERNAME;
url += ':'
url += process.env.MONGODB_PASSWORD;
url += '@ballot-buddy.xsilm.mongodb.net/User-Data?retryWrites=true&w=majority'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Passport Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/complete",
    profileFields: ['id', 'displayName', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    // Checking to find user in database (i.e., have they logged in before?)
    userModel.findOne({
      "facebookId": profile.id
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      // No user, so we make a new one!
      if (!user) {
        user = new userModel({
          "name": profile._json.name,
          "email": profile._json.email,
          "facebookId": profile._json.id
        });
        user.save(function(err) {
          if (err) console.log(err);
          return done(err, user);
        });
      // Found the user, move on to callback url
      } else {
        return done(err, user);
      }
    })
  }
));

// Starts up passport - See passport documentation for details
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userModel.findById(id, function(err, user) {
    done(err, use);
  })
});

// Callback route handler, takes us back to homepage if succesfull
app.get('/auth/facebook/complete',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/fail'
  }),
)

// Initial authorization route handler, sends user to Facebook and asks for basic info + email
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

// Pure logout route
app.use('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// Handles requests for election info
app.use('/api', buddyRouter);

// For checking login when page loads
// This was a last-minute attempt- good luck!

// app.use('/checklogin', (req, res) => {
//   if (req.user) return res.status(200).json({user: req.user});
//   res.status(314).json("Not logged in");
// })

// For saving ballots (was not able to implement)
app.use('/user', userRouter);

// Main App
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));


// 404 Handler
app.use((req,res) => {
  res.sendStatus(404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('your voting friend: listening on 3000');
})
