module.exports = (req, res, next) => {
  if(req.session.name){
    req.auth = req.session.name
    next()
  } else {
    res.redirect('/login')
  }
}