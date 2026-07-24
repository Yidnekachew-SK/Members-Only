const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

async function createMessageGet(req, res) {
    res.render('create-message');
}

validateMessageForm = [
    body('messageTitle').trim()
        .isAlpha().withMessage('Title can only be letters.')
        .isLength({ max: 50 }).withMessage('Title cannot be more than 50 characters'),
    body('messageText').trim()
        .matches(/^[a-zA-Z\s.,'"!?-]+$/).withMessage('Message can only contain letters, numbers or punctuation.')
]

createMessagePost = [
    validateMessageForm,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("create-message", {
                errors: error.array()
            });
        }

        const { messageTitle, messageText } = matchedData(req);
        console.log(req.user)
        const userId = req.user.user_id;
        await db.insertMessage(messageTitle, messageText, new Date(), userId);
        res.redirect('/');
    }
]

async function delteMessage(req, res) {
    await db.deleteMessage(req.params.id);
    res.redirect('/');
}

module.exports = {
    createMessageGet,
    createMessagePost,
    delteMessage
}
