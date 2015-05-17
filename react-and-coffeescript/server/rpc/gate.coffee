# rpc gate rpc
uid = require 'node-uuid'
c = -> console.log.apply console, arguments
exports.actions = (req, res, t) ->

    req.use 'session'
    req.use 'session_bind.test'

    check_who_am_i: ->
        if req.session.userId
            res 'OK'
        else
            res 'WHO?'

    ping: ->
        c "ping"
        res Math.random()



