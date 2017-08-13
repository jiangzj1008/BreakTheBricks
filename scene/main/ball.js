class Ball extends GeImage {
    constructor(game) {
        super(game, 'ball')
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = (400 - this.h) / 2 + 100
        this.fired = false
        this.speedX = 10
        this.speedY = 10
    }
    move(x) {
        if (x < 0) {
            x = 0
        } else if (x > 500 - this.w) {
            x = 500 - this.w
        }
        this.x = x
    }
    bounce() {
        this.speedY *= -1
    }
    hasPoint(x, y) {
        var o = this
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    update() {
        var o = this
        if (o.fired) {
            if (o.x < 0 || o.x > 500) {
                o.speedX = -o.speedX
            }
            if (o.y < 0) {
                o.speedY = -o.speedY
            }
            if (o.y > 400) {
                o.life--
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
}
