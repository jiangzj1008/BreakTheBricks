var GeGame = function(fps, images, runCallback) {
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
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
    // update
    g.update = function() {
        g.scene.update()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }
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

    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片都成功载入之后, 调用 run
            loads.push(1)
            log('load images', loads.length, names.length)
            if (loads.length == names.length) {
                log('load images', g.images)
                g.__start()
            }
        }
    }
    g.imageByName = function(name) {
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.runWithScene = function(scene) {
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            runloop()
        }, 1000/fps)
    }
    g.replaceScene = function(scene) {
        g.scene = scene
    }
    g.__start = function(scene) {
        runCallback(g)
    }

    return g
}
