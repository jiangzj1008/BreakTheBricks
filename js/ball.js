var Ball = function() {
    var image = imageFromPath('img/ball.png')
    var o = {
        image: image,
        x: 300,
        y: 200,
        speedX: 20,
        speedY: 20,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired === true) {
            if (o.x < 0 || o.x > 1000) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 800) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounce = function() {
        o.speedY *= -1
    }
    return o
}
