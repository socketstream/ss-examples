

t = require 'socketstream' ;http = require 'http'

c = -> console.log.apply console, arguments


t.client.define 'basic',
    view: 'basic.jade'
    code: ['app','libs']

t.http.route '/', (req, res) ->
    res.serveClient 'basic'

t.client.formatters.add(require('ss-coffee'))
t.client.formatters.add(require('ss-jade'))

t.session.store.use 'redis' ;t.publish.transport.use 'redis'

server = http.createServer t.http.middleware

t.start server

process.on 'uncaughtException', (e) ->
    c 'Exception caught', e

port = 3000
server.listen port

setInterval ->
  c "hey"
  t.api.publish.all "hey"
, 2200



