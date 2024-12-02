import BattleScreen from "../scenes/BattleScreen"

export default class BlockBar extends Phaser.GameObjects.Container {
    currentblock: number
    blockBar: Phaser.GameObjects.Graphics
    battleScene: BattleScreen
    blockText: Phaser.GameObjects.Text

    constructor(scene: BattleScreen) {
        super(scene, 0, 0)
        this.battleScene = scene

        this.currentblock = 0

        this.blockBar = scene.add.graphics()
        this.blockBar.fillStyle(0x008AD5)
        this.blockBar.fillRoundedRect(141.67, 15, 0, 18, 0)
        this.blockBar.lineStyle(4, 0x000000)
        this.blockBar.strokeRoundedRect(141.67, 15, 250, 18, 5)

        this.blockText = scene.add.text(266.67, 24, `0`, {fontSize: '14px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.blockText.setOrigin(0.5)

        this.add(this.blockBar)
        this.add(this.blockText)

        scene.add.existing(this)
    }

    updateBlock(newblock: number) {
        this.currentblock = newblock
        this.blockText.setText(`${this.currentblock}`)

        const blockPercentage = this.currentblock / this.battleScene.player!.maxHealth
        this.blockBar.clear()
        this.blockBar.fillStyle(0x008AD5)
        this.blockBar.fillRoundedRect(141.67, 15, 250 * blockPercentage, 18, 0)
        this.blockBar.lineStyle(4, 0x000000)
        this.blockBar.strokeRoundedRect(141.67, 15, 250, 18, 5)
    }
}
