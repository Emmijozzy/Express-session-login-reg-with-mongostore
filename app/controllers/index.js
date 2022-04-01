// Dependencies
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session')
// Initialization of controller container 
const controller = {};


// Home
controller.home = async (req, res) => {
  const name = req.auth;
  console.log(`${name} log in`)
  res.send(`Welcome home ${name}`)
}

// Register 
controller.register = async (req, res) => {
  const {username, email, password, passwordConf} = req.body;

  if(username && email && password) {
    try {
      const userData = {
        email,
        username,
        password,
      }
      const user = await User.create(userData)
      if(!user){
        console.log('error in creating new user')
      } else {
        console.log(user)
        res.send("New user created sucessfully")
      }
    } catch(err) {
      console.log("error in creating new user", err);
      res.send("error in creating new user", err)
    }
  }
}

controller.login = async (req, res) => {
  const {email, password, passwordConf} = req.body
  if(password !== passwordConf) {
    return res.send("Confirm the password submitted")
  }
  if(email && password && passwordConf) {
    try {
      let user, result;
      await User.findOne({email: email})
        .exec()
        .then(data => {
          user = data
        });
      await bcrypt.compare(password, user.password)
        .then(res => {
        result = res
        })
        .catch(err => {
          if(err) {console.log(err, "\n err in comparing password")}
        })
      if(result) {
        req.session.name = user.username
        res.redirect('/')
      } else {
        res.send("In correct password")
      }
    } catch(err) {
      if(err) {
        console.log({ErrInLogin: err})
        res.send("Server error in login").status(401)
      }
    }
  }
}

controller.logout = async (req, res) => {
  try {
    req.session.destroy()
    res.clearCookie('name')
    res.send("You've been log out");
  } catch(err) {
    if(err) {
      console.log(err)
      res.send("Error while trying to destroy session")
    }
  }
}



// export of module
module.exports = controller