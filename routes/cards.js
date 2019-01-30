const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

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

    res.render('card', templateData);
});

module.exports = router;