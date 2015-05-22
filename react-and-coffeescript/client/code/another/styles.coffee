




module.exports = styles =

    colorado: (a) ->
        position: 'absolute'
        top: a.state.position.y
        left: a.state.position.x
        zIndex: 9999

        width: 300
        height: 200
        border: '1px solid black'
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
        borderRadius: 5

