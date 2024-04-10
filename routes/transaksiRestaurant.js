const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaksiRestaurant');

/* GET transaksi restaurant . */
router.get('/', async function(req, res, next) {
    try {
        res.json(await transactionService.getMultiple(req.query.page));
    }
    catch (err) {
        console.error(`Error saat mengambil transaksi restaurant `, err.message);
        next(err);
    }
});

/* POST transaksi restaurant */
router.post('/', async function (req, res, next) {
    try {
        res.json(await transactionService.createTransaction(req.body));
    } catch (err) {
        console.error('Error saat membuat transaksi:', err.message);
        next(err);
    }
});

/* PUT transaksi restaurant */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await transactionService.updateTransaction(req.params.id, req.body));
    } catch (err) {
        console.error('Error saat memperbarui transaksi:', err.message);
        next(err);
    }
});

/* DELETE transaction */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await transactionService.removeTransaction(req.params.id));
    } catch (err) {
        console.error('Error saat menghapus transaksi:', err.message);
        next(err);
    }
});

module.exports = router;
