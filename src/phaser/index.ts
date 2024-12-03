import BattleScreen from "./scenes/FirstBattle"
import FirstScreen from "./scenes/FirstScreen"
import WorldOneBattle from "./scenes/WorldOneBattle"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [FirstScreen, BattleScreen, WorldOneBattle],
    parent: 'game-container',
    physics: {
    },
}

const game = new Phaser.Game(config)

export default game