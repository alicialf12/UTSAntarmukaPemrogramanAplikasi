const express = require('express');
const router = express.Router();
const transaksiRestaurant = require('../services/transaksiRestaurant');

/* GET transaksi restaurant . */
router.get('/', async function(req, res, next) {
  try {
    res.json(await transaksiRestaurant.getMultiple(req.query.page));
  }
  catch (err) {
    console.error(`Error while getting transaksi restaurant `, err.message);
    next(err);
  }
});

module.exports = router;
