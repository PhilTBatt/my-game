import BattleScreen from "./scenes/BattleScreen"
import FirstScreen from "./scenes/FirstScreen"

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