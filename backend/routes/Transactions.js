
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/TransactionController');

const router = require('express').Router();


router
        .get('/get-transactions', getTransactions)
        .post('/add-transaction', addTransaction)
        .delete('/delete-transaction/:id', deleteTransaction)
;

module.exports = router;