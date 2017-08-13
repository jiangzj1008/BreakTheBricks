var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    if (window.localStorage.level) {
        var localLevel = JSON.parse(window.localStorage.level)
        if (localLevel[n].length > 0) {
            level = localLevel[n]
        }
    }
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block.new(game, p)
        blocks.push(b)
    }
    return blocks
}

var inputPng = function(images, name, number) {
    for (var i = 1; i <= number; i++) {
        var key = name + i
        var value = `img/${key}.png`
        images[key] = value
    }
}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
    }

    inputPng(images, 'block', 3)
    var game = GeGame.instance(30, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
