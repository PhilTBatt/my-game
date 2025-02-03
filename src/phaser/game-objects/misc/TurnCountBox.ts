import FirstBattle from "../../scenes/FirstBattle"

export default class TurnCount extends Phaser.GameObjects.Container {
    turnBox: Phaser.GameObjects.Graphics
    turnText: Phaser.GameObjects.Text | undefined

    constructor(scene: FirstBattle) {
        super(scene, 500, 24)

        this.turnBox = scene.add.graphics()
        this.turnBox.lineStyle(4, 0x000000)
        this.turnBox.strokeRoundedRect(-45, -14, 90, 28, 5)

        this.turnText = scene.add.text(0, 0, 'Turn: 1', {fontSize: '23px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.turnText.setOrigin(0.5)

        this.add(this.turnBox)
        this.add(this.turnText)

        scene.add.existing(this)
    }

    animateNewTurn(scene: FirstBattle) {
        this.turnBox?.setScale(1.06)
        this.turnText?.setScale(1.06)

        this.scene.time.delayedCall(275, () => {
            this.turnBox?.setScale(1.12)
            this.turnText?.setScale(1.12)
        })

        this.scene.time.delayedCall(550, () => {
            this.turnBox?.setScale(1.18)
            this.turnText?.setScale(1.18)
        })

        this.scene.time.delayedCall(825, () => {
            this.turnBox?.setScale(1.12)
            this.turnText?.setScale(1.12)
        })

        this.scene.time.delayedCall(1200, () => {
            this.turnBox?.setScale(1.06)
            this.turnText?.setScale(1.06)
        })

        this.scene.time.delayedCall(1475, () => {
            this.turnBox?.setScale(1)
            this.turnText?.setScale(1)
            this.turnText!.setText(`Turn: ${scene.turnCount}`)
        }) 
    }
}
