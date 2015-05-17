# testing something with sessions
c = -> console.log.apply(console, arguments)
fs = require 'fs'
exports.test =->
  (req,res,next)->
    c Object.keys(req)
    c req.sessionId
    if req.session['something']?
      req.session['something'] += 1
    else
      req.session['something'] = 0
    req.session.save()
    return next()
