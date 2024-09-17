const { registerUser, loginUser, logoutUser, getUser, getUsers, updateUser, resetUserPassword, setUserPassword, deleteUser } = require('../controllers/UserController')


const router = require('express').Router()
        
router
    .post('/register', registerUser)
    .post('/login', loginUser)
    .post('/signout', logoutUser)
    .get('/get-user/:id', getUser)
    .get('/get-users', getUsers)
    .put('/update-user/:id', updateUser)
    .put('/reset-userPassword/:id', resetUserPassword)
    .put('/update-userPassword/:id', setUserPassword)
    .delete('/delete-user/:id', deleteUser)

module.exports = router