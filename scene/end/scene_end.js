class SceneEnd extends GeScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        var text = '按 R 返回初始界面'
        this.game.drawText(text, 150, 200)
    }
    update() {

    }
}
