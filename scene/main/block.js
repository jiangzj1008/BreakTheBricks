class Block extends GeImage {
    constructor(game, position) {
        super(game, 'block1')
        this.x = position[0]
        this.y = position[1]
        this.life = position[2] || 1
        this.frames = ['block1', 'block2', 'block3']
    }
    hasPoint(x, y) {
        var o = this
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    update() {
        var name = this.frames[this.life-1]
        this.texture = this.game.textureByName(name)
    }
}
