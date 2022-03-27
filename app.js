// Dependencies
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const app = express()

// Global var
const port = process.env.PORT || 8080

// Session setup
app.use( session( {
  secret: 'Emmijozzy360',
  resave: true,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
  // req.session.key = value
  req.session.name = 'Emmijozzy'
  console.log(process.env.NODE_ENV == 'production')
  if(process.env.NODE_ENV == 'production') {
    return res.send("Session on production set")
  } else {
    return res.send("Session set")
  }
})

app.get('/home', (req, res) => {
  const name = req.session.name
  return res.send(name)
})

app.get('/logout', async (req, res) => {
  const del = await req.session.destroy();
  res.clearCookie('connect.sid')
  console.log(del)
  return res.send("Session Destroyed")
})


app.listen(port, (err) => {
  if(err) throw err
  console.log("app listening to port:" + port)
})
