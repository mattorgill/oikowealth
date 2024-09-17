const express = require('express')
const session = require('express-session')
const cors = require('cors')
const { db } = require('./db/Db')
const {readdirSync} = require('fs')
const MongoStore = require('connect-mongo')

require('dotenv').config()

const PORT = process.env.SERVER_PORT

const app = express()


// middlewares?
app.use(express.json())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET || 'test',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.OIKO_DB_URL, //MONGO_TEST_URL,
        collectionName: 'sessions',
        ttl: 60 * 60 * 10 // 10 hours

    }),
    cookie: { 
        secure: false, // set to true if using https, could make it process.env.ENV === 'prod'
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    } 
}))

// routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

const server = () => {
    
    db()

    app.listen(PORT, () => {
        console.log('You are listening on port: ', PORT)
    })
}

server()