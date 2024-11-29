import FirstScreen from "./FirstScreen"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: FirstScreen,
    parent: 'game-container',
    physics: {
    },
}

const game = new Phaser.Game(config)

export default game