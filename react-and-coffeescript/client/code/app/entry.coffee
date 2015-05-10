
styles = require('./styles.coffee')

# window.onmousemove = (e) ->
#     event = new CustomEvent 'mouse_pos', {x: e.clientX, y: e.clientY}
#     window.dispatchEvent event

# window.onmouseup = ->
#     cc 'mouseup'
#     event = new Event 'mouseuppp'
#     window.dispatchEvent event

c = ->
    event = new CustomEvent "con---sole", {'detail': arguments}
    window.dispatchEvent event
    console.log.apply console, arguments

cc = -> console.log.apply console, arguments

window.t = require 'socketstream'

t.server.on 'disconnect', ->
    console.log 'lost connection :-('

t.server.on 'reconnect', ->
    console.log 'recovered connection :-)'

t.event.on 'hey', (a) ->
    c "got a message", a

{p, div, h1, input, svg, textarea, circle, form, h3, span } = React.DOM

rr = -> React.createFactory(React.createClass.apply(React, arguments))

monterrey = rr

    render: ->
        div
            key: 'monterrey'
            className: 'monterrey',
            "ha"
            colorado
                initial_position: {x: 204, y: 240}
            structured_console
                initial_position: {x: 10, y: 110}
            structured_console
                initial_position: {x: 600, y: 110}

structured_console = rr

    getInitialState: ->
        position:
            x: @props.initial_position.x
            y: @props.initial_position.y
        logs: []

    # componentDidUnmount: ->
        # remove event listener from window

    componentDidMount: ->
        window.addEventListener 'con---sole', (a) =>
            @setState
                logs: [@state.logs..., a.detail]

    render: ->
        div
            key: 'structured_console'
            className: 'structured_console'
            style:
                top: @state.position.y + 'px'
                left: @state.position.x + 'px'
            ,
            for item, idx in @state.logs
                span
                    key: 'sc_line' + idx,
                    item

remote_control = rr
    
    render: ->
        div
            key: 'remote_control',
            "something here soon to control "
            input
                placeholder: 'radio'

colorado = rr

    getInitialState: ->
        position: @props.initial_position

    __handle_change: (e) ->
        c e.currentTarget.value
        t.rpc 'gate.ping', (res)->
            c res

    addDragEvents: ->
        cc 'adding'
        document.addEventListener 'mousemove', @onMouseMove
        document.addEventListener 'mouseup', @onMouseUp

    removeDragEvents: ->
        cc 'removing'
        document.removeEventListener 'mousemove', @onMouseMove
        document.removeEventListener 'mouseup', @onMouseUp

    onMouseUp: (e) ->
        @removeDragEvents()

    onMouseDown: (e) ->
        e.stopPropagation()
        @addDragEvents()
        cc 'rectangle', e.currentTarget.getBoundingClientRect()
        pageOffset = e.currentTarget.getBoundingClientRect()
        @setState
            originX: e.pageX
            originY: e.pageY
            elementX: pageOffset.left
            elementY: pageOffset.top

    onMouseMove: (e) ->
        deltaX = e.pageX - @state.originX
        deltaY = e.pageY - @state.originY

        @setState
            position:
                x: @state.elementX + deltaX + document.body.scrollLeft
                y: @state.elementY + deltaY + document.body.scrollTop

    style: ->
        style =
            position: 'absolute'
            top: @state.position.y
            left: @state.position.x
            zIndex: 9999
            width: 300
            height: 200
            border: '1px solid black'
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
            borderRadius: 5

    render: ->
        div
            draggable: false
            key: 'colorado'
            style: @style()

            #onDragStart: @dragStart
            #onDragEnd: @dragEnd
            onMouseDown: @onMouseDown

            ,
            input
                placeholder: 'something here'
                onChange: @__handle_change
                style:
                    margin: '10%'



imp = ->
    monterrey()
    #colorado()




amp = document.getElementById 'amp'
render = -> React.render imp(), amp
render()

setInterval ->
    t.rpc 'gate.check_who_am_i', (res) ->
        c 'new res', res
, 3000

