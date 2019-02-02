const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

function randomNum(max) {
    return Math.floor(Math.random() * max);
}
function cardRedirect(response, cardNum) {
    response.redirect(`/cards/${cardNum}?side=question`);
}

router.get('/', (req, res) => {
    cardRedirect(res, randomNum(cards.length));
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;
    const text = cards[id][side];
    const {hint} = cards[id];
    const name = req.cookies.username;
    const templateData = {text, id, name};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.otherSide = 'answer';
        templateData.side = 'question';
        res.render('card', templateData);
    } else if (side === 'answer') {
        templateData.otherSide = 'question';
        templateData.side = 'answer';
        res.render('card', templateData);
    } else {
        cardRedirect(res, id);
    }

});

module.exports = router;