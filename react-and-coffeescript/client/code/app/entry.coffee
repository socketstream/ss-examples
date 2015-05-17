
# showing how inline styles can be factored out 
styles = require('./styles.coffee')

# aliasing console.log, in this case prototyping a move to structured interactive logging
c = ->
    event = new CustomEvent "con---sole", {'detail': arguments}
    window.dispatchEvent event
    console.log.apply console, arguments

# aliasing console.log
cc = -> console.log.apply console, arguments

window.t = require 'socketstream'

t.server.on 'disconnect', ->
    console.log 'lost connection :-('

t.server.on 'reconnect', ->
    console.log 'recovered connection :-)'

t.event.on 'hey', (a) ->
    c "got a message", a

{p, div, h1, input, svg, textarea, circle, form, h3, span } = React.DOM

# aliasing the React component creation function
rr = -> React.createFactory(React.createClass.apply(React, arguments))


# a macro wrapper component
monterrey = rr

    render: ->
        div
            key: 'monterrey'
            className: 'monterrey',
            draggable(colorado2)
                initial_position: {x: 204, y: 240}
            structured_console
                initial_position: {x: 10, y: 110}
            structured_console
                initial_position: {x: 600, y: 110}

# some prototype sketch of nothing in particular,
# this accepts messages from the virtual console and prints them 
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
                #logs: [@state.logs..., a.detail]
                logs: [a.detail, @state.logs...]

    render: ->
        div
            key: 'structured_console'
            className: 'structured_console'
            style:
                top: @state.position.y + 'px'
                left: @state.position.x + 'px'
            ,
            for item, idx in @state.logs
                p
                    key: 'sc_line' + idx,
                    item

# nothing here yet
remote_control = rr
    
    render: ->
        div
            key: 'remote_control',
            "something here soon to control "
            input
                placeholder: 'radio'

# this is a wrapper component for making other components draggable, by composition within this one
# this may not be the most elegant pattern for composition .
draggable = (a) ->  # for composition instead of mixin
    rr
        getInitialState: ->
            position: @props.initial_position

        addDragEvents: ->
            document.addEventListener 'mousemove', @onMouseMove
            document.addEventListener 'mouseup', @onMouseUp

        removeDragEvents: ->
            document.removeEventListener 'mousemove', @onMouseMove
            document.removeEventListener 'mouseup', @onMouseUp

        onMouseUp: (e) ->
            @removeDragEvents()

        onMouseDown: (e) ->
            e.stopPropagation()
            @addDragEvents()
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

        style: =>
            position: 'absolute'
            left: @state.position.x
            top: @state.position.y
            zIndex: 9999

        render: ->
            div
                style:
                    position: 'absolute'
                    left: @state.position.x
                    top: @state.position.y
                    zIndex: 9999
                onMouseDown: @onMouseDown
                ,
                a()

# todo : delete ?
colorado2 = rr

    __handle_change: (e) ->
        c e.currentTarget.value
        t.rpc 'gate.ping', (res)->
            c res

    style:
        width: 300
        height: 200
        border: '1px solid black'
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
        borderRadius: 5

    render: ->
        div
            key: 'colorado'
            style: @style
            ,
            input
                placeholder: 'something here'
                onChange: @__handle_change
                style:
                    margin: '10%'

# the entire app gets wrapped in this before rendering to DOM
imp = ->
    monterrey()


amp = document.getElementById 'amp'
render = -> React.render imp(), amp
render()

setInterval ->
    t.rpc 'gate.check_who_am_i', (res) ->
        c 'new res', res
, 3000

