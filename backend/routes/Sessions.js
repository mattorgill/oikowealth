const { getSession} = require('../controllers/SessionController')


const router = require('express').Router()
        
router.get('/session', getSession)

module.exports = router