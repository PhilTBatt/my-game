import BattleScreen from "./game-objects/scenes/BattleScreen"
import FirstScreen from "./game-objects/scenes/FirstScreen"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [FirstScreen, BattleScreen],
    parent: 'game-container',
    physics: {
    },
}

const game = new Phaser.Game(config)

export default game