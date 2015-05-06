# rpc gate rpc
c = -> console.log.apply console, arguments
exports.actions = (req, res, t) ->

    req.use 'session'

    ping: ->
        c "ping"
        res Math.random()



