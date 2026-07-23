const { Router } = require('express');
const registerController = require('../controllers/registerController');
const db = require('../db/queries');

const signupRouter = Router();

signupRouter.get('/', registerController.homepageGet);

signupRouter.get('/sign-up', (req, res) => { 
    res.render('sign-up');
});

signupRouter.post('/sign-up', registerController.registerUser);
signupRouter.get('/login', (req, res) => {
    res.render('login')
})

module.exports = signupRouter