// Dependencies
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')
const router = require('./app/routes/index')
const mongdb = require('./app/models/config');
const app = express()

// Global var
const port = process.env.PORT || 8080

// Session setup
app.use( session( {
  secret: 'Emmijozzy360',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, // Time to live
    autoRemove: 'native'
   }),
  cookie: {expires: new Date(Date.now() + 86400 * 1000) }
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// route
app.use('/', router)


// app initialization
mongdb()
  .then( () => {
    app.listen(port, (err) => {
      if(err) throw err
      console.log("app listening to port:" + port)
    })
  })
  .catch((err) => {
    console.log(err)
  })
