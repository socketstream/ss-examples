

t = require 'socketstream' ;http = require 'http'

c = -> console.log.apply console, arguments

t.client.define 'basic',
    view: 'basic.jade'
    code: ['app','libs']
    css: ['app']

t.client.define 'another',
    view: 'basic.jade'
    code: ['another', 'libs']
    css: ['another']

t.http.route '/testing', (req, res) ->
    c "yes"
    c "(http) req.session", Object.keys(req.session)
    #c req.socket.request.headers.cookie
    #c Object.keys(req.socket)
    #c req.headers # this one contains our ws cookie but as unparsed string

    #c Object.keys(req.signedCookies)
    #c 'req.signedCookies[connect.sid]', req.signedCookies['connect.sid']
    for item in Object.keys(res)
        if typeof(res[item]) is 'function'
            c item
    res.write Date.now() + "   hi"
    res.end()


t.http.route '/another', (req, res) ->

    res.serveClient 'another'

t.http.route '/', (req, res) ->
    #c "(http) req:", req
    #c "(http) req:", Object.keys(req)
    #c "(http) req.cookies", req.cookies
    #c "(http) req.sessionID", req.sessionID
    #c "(http) t.session.find", t.session.find(req.sessionID)
    c "(http) req.session", Object.keys(req.session)
    #c "(http) req.session.cookie", req.session.cookie

    #c "(http) req.sessionStore", req.sessionStore
    #c req.socket.request.headers.cookie
    #c Object.keys(req.socket)
    #c 'req.headers.cookie', req.headers.cookie # this one contains our ws cookie but as unparsed string
    c 'signedCookies', Object.keys(req.signedCookies)
    c "signedCookies['connect.sid']", req.signedCookies['connect.sid']
    #c '(http) req.signedCookies[connect.sid]', req.signedCookies['connect.sid']

    res.serveClient 'basic'

t.client.formatters.add(require('ss-coffee'))
t.client.formatters.add(require('ss-jade')) # not using templates so largely superfluous
t.client.formatters.add(require('ss-stylus')) # using inline styles now so don't need

t.session.store.use 'redis', {secret: "SocketStream"}
t.publish.transport.use 'redis', {secret: "SocketStream"} # should be a secret here ?
t.session.options.secret = "wholeNewSecret"
server = http.createServer t.http.middleware

t.start server

process.on 'uncaughtException', (e) ->
    c 'Exception caught', e

port = 3000
server.listen port

setInterval ->
  t.api.publish.all "hey", Math.random()
, 2200



