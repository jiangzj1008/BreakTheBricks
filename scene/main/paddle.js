class Paddle extends GeImage {
    constructor(game) {
        super(game, 'paddle')
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = (400 - this.h) / 2 + 150
        this.speed = 10
        this.lengthened = false
        this.originW = this.w
        this.originH = this.h
    }
    move(x) {
        if (x < 0) {
            x = 0
        } else if (x > 500 - this.w) {
            x = 500 - this.w
        }
        this.x = x
    }
    moveLeft(status) {
        if (status == 'down') {
            this.flipX = true
            this.move((this.x - this.speed))
        }
    }
    moveRight(status) {
        if (status == 'down') {
            this.flipX = false
            this.move((this.x + this.speed))
        }
    }

    // 挡板延长
    lengthen(num) {
        if (this.lengthened) {
          return
        }

        this.lengthened = true
        const w = num / 2
        this.x -= w
        this.w = this.w + num

        setTimeout(() => {
            this.resetLength()
        }, 10 * 1000)
    }

    resetLength() {
        this.x += (this.w - this.originW) / 2
        this.w = this.originW
        this.h = this.originH
        this.lengthened = false
    }
}
