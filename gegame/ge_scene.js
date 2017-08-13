class GeScene {
    constructor(game) {
        this.game = game
        this.elements = {}
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img, type) {
        img.scene = this
        this.elements[type].push(img)
    }
    randomBetween(start, end) {
        var x = Math.random() * (end - start + 1)
        return Math.floor(x + start)
    }
}
