class Scene extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.text = '按 F 开始'
        this.level = 1
        this.score = 0
        this.elements = {
            paddle: [],
            blocks: [],
            ball: [],
        }
        this.setupPaddle()
        this.setupBlock(1)
        this.setupBall()
        this.setupEvent()
        this.setupEditEvent()
    }
    setupPaddle() {
        var g = this.game
        var p = Paddle.new(g)
        this.paddle = p
        this.addElement(p, 'paddle')
    }
    setupBlock(level) {
        var g = this.game
        var blocks = loadLevel(g, level)
        this.elements.blocks = blocks
    }
    setupBall() {
        var g = this.game
        var b = Ball.new(g)
        this.ball = b
        this.addElement(b, 'ball')
    }
    setupEvent() {
        var g = this.game
        var p = this.paddle
        var b = this.ball
        var self = this
        g.registerAction('a', function(keyStatus){
            p.moveLeft(keyStatus)
        })
        g.registerAction('d', function(keyStatus){
            p.moveRight(keyStatus)
        })
        g.registerAction('f', function(keyStatus){
            if (keyStatus == 'down') {
                b.fired = true
            }
        })
        g.registerAction('s', function(keyStatus){
            if (keyStatus == 'down') {
                self.saveLevel()
            }
        })
        g.registerAction('1', function(keyStatus){
            if (keyStatus == 'down') {
                self.level = 1
                self.setupBlock(self.level)
            }
        })
        g.registerAction('2', function(keyStatus){
            if (keyStatus == 'down') {
                self.level = 2
                self.setupBlock(self.level)
            }
        })
        g.registerAction('3', function(keyStatus){
            if (keyStatus == 'down') {
                self.level = 3
                self.setupBlock(self.level)
            }
        })
        g.registerAction('t', function(keyStatus){
            if (keyStatus == 'down') {
                self.paddle.lengthen(50)
            }
        })
    }
    saveLevel() {
        var arr = []
        var blocks = this.elements.blocks
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            var position = [b.x, b.y, b.life]
            arr.push(position)
        }
        if (window.localStorage.level) {
            var localLevel = JSON.parse(window.localStorage.level)
        } else {
            var localLevel = [[], [], []]
        }
        localLevel[this.level-1] = arr
        var t = JSON.stringify(localLevel)
        window.localStorage.setItem('level', t)
    }
    hasBlock(blocks, x, y) {
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.hasPoint(x, y)) {
                b.life++
                if (b.life > 3) {
                    b.life = 0
                }
                return true
            }
        }
        return false
    }
    setupEditEvent() {
        this.enableDrag = false
        var self = this
        var game = this.game
        var ball = this.ball
        var enableDrag = this.enableDrag
        game.canvas.addEventListener('mousedown', function(event) {
            if (!window.paused) {
                return
            }
            var x = event.offsetX
            var y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            } else if (!self.hasBlock(self.elements.blocks, x, y)) {
                var blockX = Math.floor(x / 40) * 40
                var blockY = Math.floor(y / 20) * 20
                var p = [blockX, blockY]
                var newBlock = Block.new(game, p)
                self.addElement(newBlock, 'blocks')
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
        })
    }
    detect() {
        var ball = this.ball
        var paddle = this.paddle
        var blocks = this.elements.blocks
        if (ball.collide(paddle)) {
            ball.bounce()
        }
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (ball.collide(b)) {
                b.life--
                ball.bounce()
            }
        }
    }
    draw() {
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                if (e.life > 0) {
                    this.game.drawImage(e)
                } else {
                    elements.splice(j, 1)
                    j--
                }
            }
        }
        this.game.drawText(this.text, 10, 380)
    }
    update() {
        if (this.ball.life <= 0) {
            var s = SceneEnd.new(this.game)
            this.game.runWithScene(s)
          // console.log('gelog', 'scene end')
        }
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            if (type == 'ball' && window.paused) {
                return
            }
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                e.update()
            }
        }
        this.detect()
    }
}
