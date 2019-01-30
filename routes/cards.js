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

    const templateData = {text, id};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.otherSide = 'answer';
    } else if (side === 'answer') {
        templateData.otherSide = 'question';
    }

    if (!side) {
        cardRedirect(res, id);
    } else {
        res.render('card', templateData);
    }
});

module.exports = router;