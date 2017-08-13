class GeImage extends GeScene {
    constructor(game, name) {
        super(game)
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipX = false
        this.flipY = false
        this.rotation = 0
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(img) {
        var a = this
        var b = img
        if (this.aInb(a.x, b.x, b.x + b.w) || this.aInb(b.x, a.x, a.x + a.w)) {
            if (this.aInb(a.y, b.y, b.y + b.h) || this.aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    update() {

    }
}
