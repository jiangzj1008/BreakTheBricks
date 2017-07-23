var Paddle = function() {
    var image = imageFromPath('img/paddle.png')
    var o = {
        image: image,
        x: 300,
        y: 500,
        speed: 20,
    }
    o.move = function (x) {
        if (x < 0) {
            x = 0
        }
        if (x > 1000 - o.image.width) {
            x = 1000 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                log('1')
                return true
            }
        }
        return false
    }
    return o
}
