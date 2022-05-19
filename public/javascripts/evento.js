const express = require('express');
const { all } = require('../../app');
const evento = require('../script/evento');
const router = new express.Router();
 
router.get('/:id', async (req, res, next) => {
  let options = { 
    "id": req.query.id,
  };


  try {
    const result = await evento.getEvento(id);
    
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.post('/', async (req, res, next) => {
  let options = { 
    "id": req.query.id,
  };


  try {
    const result = await evento.creaEvento(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;