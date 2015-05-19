# testing something with sessions
c = -> console.log.apply(console, arguments)
fs = require 'fs'
exports.test =->
  (req,res,next)->
    #c "(ws) req: ", Object.keys(req)
    #c "(ws) req.session", Object.keys(req.session)
    #c "(ws) req.sessionId: ", req.sessionId
    if req.session['something_else']?
      req.session['something_else'] += 1
    else
      req.session['something_else'] = 0
    req.session.save()
    return next()
