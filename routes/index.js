const express  = require("express"),
      router   = express.Router(),
      User     = require("../models/user"),
      passport = require("passport");

// HOME PAGE
router.get('/', function(req,res){
console.log("hmm");
    res.render('index', {
        page: 'index'
    });
});

// Chat Page
router.get('/chat', function (req,res) {
    res.render('chat', {
        Port: 3000,
        page: 'chat'
    });
});

router.get('/mouse', function (req,res) {
   res.render('mouse', {
      page: 'mouse'
   });
});

// register form
router.get('/signup', (req,res) => {
    res.render('signup');
});

// sign up logic
router.post('/signup', (req,res) => {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar
    }), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("signup", {error: err.message});
        }
        passport.authenticate('local')(req,res, function() {
            req.flash('success','Welcome to Site ' + user.username);
            res.redirect('/');
        });
    });
});

// login form
router.get('/login', (req,res) => {
    res.render('login');
});

// login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup',
    successFlash: 'Successfully Logged in',
    failureFlash: 'Invalid username or password'
}), (req,res) => {
});

// logout route
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/');
});


module.exports = router;
