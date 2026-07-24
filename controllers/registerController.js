const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');
const bcrypt = require("bcryptjs");

async function homepageGet(req, res) {
    const messages = await db.getMessagesWithUser();
    res.render('index', { messages, showJoinForm: false})
}

validateRegisterUser = [
    body('firstName').trim()
        .isAlpha().withMessage('First name must only be letters.'),
    body('lastName').trim().optional()
        .isAlpha().withMessage('Last name must only be letters.'),
    body('username').trim()
        .isAlphanumeric().withMessage('Username must only be letters and numbers.'),
    body('password').trim()
        .isAlphanumeric().withMessage('Password must only be letters and numbers.')
        .isLength({min: 8}).withMessage('Password must be atleat 8 characters long'),
    body('confirmPassword').trim().custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage('Password doesnot match.')
]

registerUser = [
    validateRegisterUser,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("sign-up", {
                errors: error.array()
            });
        }
        const { firstName, lastName, username, password } = matchedData(req);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.registerUser(firstName, lastName, username, hashedPassword);
        res.redirect('/create-message');
    }
]

const code = process.env.MEMBERSHIP_CODE;
validateJoinForm = [
    body('membersCode').trim()
        .isAlpha().withMessage('Membership code must only be letters.')
        .equals(code).withMessage('Incorrect code.')
]

joinClubPost = [
    validateJoinForm,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("index", {
                messages: await db.getMessagesWithUser(),
                errors: error.array(),
                showJoinForm: true
            });
        }
        const userId = req.user.user_id;
        await db.updateMembershipStatus(userId);
        res.redirect('/');
    }
]

module.exports = {
    homepageGet,
    registerUser,
    joinClubPost
}