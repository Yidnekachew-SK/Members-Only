const { Router } = require('express');
const passport = require("passport");
const registerController = require('../controllers/registerController');
const db = require('../db/queries');
const loginController = require('../controllers/loginController');
const messageController = require('../controllers/messageContoller');

const signupRouter = Router();

signupRouter.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

signupRouter.get('/', registerController.homepageGet);

signupRouter.get('/sign-up', (req, res) => { 
    res.render('sign-up');
});

signupRouter.post('/sign-up', registerController.registerUser);

signupRouter.get('/login', (req, res) => {
    res.render('login', {errors: req.session.messages || []})
});

signupRouter.get('/create-message', messageController.createMessageGet);

signupRouter.post('/create-message', messageController.createMessagePost);

signupRouter.post('/login', 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true,
    })
);

signupRouter.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

//signupRouter.delete('/:id/delete', messageController.delteMessage);

signupRouter.post('/join', registerController.joinClubPost)

module.exports = signupRouter