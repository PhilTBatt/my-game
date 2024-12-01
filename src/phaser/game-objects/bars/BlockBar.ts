import BattleScreen from "../scenes/BattleScreen"

export default class BlockBar extends Phaser.GameObjects.Container {
    currentblock: number
    blockBar: Phaser.GameObjects.Graphics
    battleScene: BattleScreen

    constructor(scene: BattleScreen) {
        super(scene, 0, 0)
        this.battleScene = scene

        this.currentblock = 0

        this.blockBar = scene.add.graphics()
        this.blockBar.fillStyle(0x008AD5)
        this.blockBar.fillRoundedRect(141.67, 20, 0, 15, 0)
        this.blockBar.lineStyle(4, 0x000000)
        this.blockBar.strokeRoundedRect(141.67, 20, 250, 15, 5)

        this.add(this.blockBar)

        scene.add.existing(this)
    }

    updateblock(newblock: number) {
        this.currentblock = newblock

        const blockPercentage = this.currentblock / this.battleScene.player!.maxHealth
        this.blockBar.clear()
        this.blockBar.fillStyle(0x008AD5)
        this.blockBar.fillRoundedRect(-100, -25, 200 * blockPercentage, 100, 20)
        this.blockBar.lineStyle(4, 0x000000)
        this.blockBar.strokeRoundedRect(141.67, 20, 250, 15, 15)
    }
}
