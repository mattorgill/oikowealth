const {} = require('../controllers/UserController');
const {addCategory, getCategories, updateCategory, deleteCategory} = require('../controllers/CategoryController');

const router = require('express').Router()
        
router
    .get('/get-categories', getCategories)
    .post('/add-category', addCategory)
    .put('/update-category/:id', updateCategory)
    .delete('/delete-category/:id', deleteCategory)

module.exports = router