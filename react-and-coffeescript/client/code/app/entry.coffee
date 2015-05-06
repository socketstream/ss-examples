

c = -> console.log.apply console, arguments

window.t = require 'socketstream'

t.server.on 'disconnect', ->
  console.log 'lost connection :-('

t.server.on 'reconnect', ->
  console.log 'recovered connection :-)'

t.event.on 'hey', ->
  console.log "got a message"

{p, div, h1, input, svg, textarea, circle, form, h3 } = React.DOM



rr = -> React.createFactory(React.createClass.apply(React, arguments))



colorado = rr
    __handle_change: (e) ->
        c e.currentTarget.value
        t.rpc 'gate.ping', (res)->
            c "res on", res


    render: ->
        div 0,
            input
                placeholder: 'something here'
                onChange: @__handle_change


imp = ->
    colorado()










amp = document.getElementById 'amp'
render = -> React.render imp(), amp
render()

