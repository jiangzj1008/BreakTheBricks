class GeGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.running = false
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = 'up'
        })
        this.init()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawText(text, x, y) {
        this.context.font = "24px serif";
        this.context.fillText(text, x, y)
    }
    drawImage(img) {
        if (img.draw) {
            img.draw()
        } else {
            this.context.drawImage(img.texture, img.x, img.y)
        }
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    stop() {
      this.running = false
    }
    continue() {
      this.running = true
      this.runloop()
    }
    runloop() {
        if (!this.running) {
           return
        }
        // events
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var status = this.keydowns[key]
            if(status == 'down') {
                this.actions[key]('down')
            } else if (status == 'up') {
                this.actions[key]('up')
                this.keydowns[key] = ''
            }
        }
        // update
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()
        // next run loop
        var g = this
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    textureByName(name) {
        var img = this.images[name]
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        // 如果 game 在跑了，就不需要再触发 run
        if (!g.running) {
          this.continue()
        }
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(this.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    g.__start()
                }
            }
        }
    }
}
