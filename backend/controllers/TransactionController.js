const TransactionSchema = require("../models/TransactionModel");


exports.addTransaction = async (req, res) => {
    const {title, amount, type, category, description, date} = req.body;
    const user = req.session.user;

    if (!user) {
        return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
    }

    const userId = user._id;
    const transaction = TransactionSchema({
        title,
        amount,
        type,
        category,
        description,
        date,
        user: userId
    });

    try {
        if (!userId) {
            return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
        }

        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required.'});
        }
        if (amount < 0 || !amount === 'number') {
            return res.status(400).json({message: 'Amount must be a positive number.'});
        }

        await transaction.save();
        res.status(200).json({message: 'Transaction Added'});

    } catch (error) {
        res.status(500).json({message: 'Server Error - ' + error});
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
        }

        const userId = user._id;
        const transactions = await TransactionSchema.find({ user: userId }).sort({createdAt: -1});
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({message: 'Server Error - ' + error});
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
        }

        const userId = user._id;
        const {id} = req.params;
        const transactionToDelete = await TransactionSchema.findOne({ _id: id, user: userId });

        if (!transactionToDelete) {
            res.status(404).json({message: 'Transaction not found or you are not authorized to delete it.'});
        }

        TransactionSchema.findByIdAndDelete(id)
            .then((transaction) => {
                res.status(200).json({message: 'Transaction Deleted'});
            })
            .catch ((err) => {
                res.status(500).json({message: 'Server Error - ' + err});
            });
    } catch (error) {
        res.status(500).json({message: 'Server Error - ' + error});
    }
}