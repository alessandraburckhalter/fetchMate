
function checkAuth(req, res, next) {
    if(req.session.user){
      next()
    }else{
      res.status(401).json({
        error: 'Please Login to View'
      })
    }
  }

module.exports = checkAuth