# rpc tower rpc
t= require 'socketstream' ;c= t.api.log;
exports.actions= (req, res, tt)->
    req.use 'session'
    req.use 'user.authenticated'
    
    pingProtected: ->
        res 'OK'
        userZ= req.session.userId
        t.api.publish.user userZ, "tower calls"
        c "tower calls"