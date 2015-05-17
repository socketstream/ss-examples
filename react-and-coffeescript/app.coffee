

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

t.http.route '/another', (req, res) ->

    res.serveClient 'another'

t.http.route '/', (req, res) ->
    c Object.keys(req)
    #c req.socket.request.headers.cookie
    #c Object.keys(req.socket)
    #c req.headers # this one contains our ws cookie but as unparsed string

    #c Object.keys(req.signedCookies)
    c req.signedCookies['connect.sid']
    res.serveClient 'basic'

t.client.formatters.add(require('ss-coffee'))
t.client.formatters.add(require('ss-jade'))
t.client.formatters.add(require('ss-stylus'))

t.session.store.use 'redis' ;t.publish.transport.use 'redis'

server = http.createServer t.http.middleware

t.start server

process.on 'uncaughtException', (e) ->
    c 'Exception caught', e

port = 3000
server.listen port

setInterval ->
  t.api.publish.all "hey", Math.random()
, 2200



