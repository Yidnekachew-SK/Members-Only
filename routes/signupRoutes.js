const { Router } = require('express');
const registerController = require('../controllers/registerController');

const signupRouter = Router();

signupRouter.get('/', (req, res) => { 
    res.render('sign-up');
});
signupRouter.post('/', registerController.registerUser);

module.exports = signupRouter