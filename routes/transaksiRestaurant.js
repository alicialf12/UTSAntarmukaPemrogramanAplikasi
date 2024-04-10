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

/* POST transaksi restaurant */
router.post('/', async function (req, res, next) {
    try {
        res.json(await transactionService.createTransaction(req.body));
    } catch (err) {
        console.error('Error while creating transaction:', err.message);
        next(err);
    }
});

/* PUT transaksi restaurant */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await transactionService.updateTransaction(req.params.id, req.body));
    } catch (err) {
        console.error('Error while updating transaction:', err.message);
        next(err);
    }
});

module.exports = router;
