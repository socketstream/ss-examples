#user auths
exports.authenticated=->
  (req,res,next)->
    if req.session and req.session.userId
      return next()
    else
      res false