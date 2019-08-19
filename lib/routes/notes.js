const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, text } = req.body;
    Note
      .create({ title, text })
      .then(note => res.send(note))
      .catch(next);
  });
