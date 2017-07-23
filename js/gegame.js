var GeGame = function() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = e('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(geImage) {
        g.context.drawImage(geImage.image, geImage.x, geImage.y)
    }
    // event
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    // register
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    window.fps = 30
    var runloop = function () {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        g.update()
        context.clearRect(0, 0, canvas.width, canvas.height)
        g.draw()
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    setTimeout(function(){
        runloop()
    }, 1000/fps)

    return g
}
