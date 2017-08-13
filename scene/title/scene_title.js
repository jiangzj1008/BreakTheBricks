class SceneTitle extends GeScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        var text = '按 K 开始游戏'
        this.game.drawText(text, 150, 200)
    }
    update() {

    }
}
