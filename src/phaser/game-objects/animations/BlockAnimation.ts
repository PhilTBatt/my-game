import BattleScreen from "../../scenes/BattleScreen"

export default class BlockAnimation extends Phaser.GameObjects.Container {
    blockIcon: Phaser.GameObjects.Image

    constructor(scene: BattleScreen) {
        super(scene, 0, 0)

        this.blockIcon = scene.add.image(400, 275, 'block-icon').setScale(0.2)
        scene.add.existing(this.blockIcon)
        this.blockIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startBlockAnimation() {
        this.scene.tweens.add({targets: this.blockIcon, y: 200, duration: 900, ease: 'Linear'})
        this.scene.tweens.add({targets: this.blockIcon, alpha: 1, duration: 500, ease: 'Linear'})

        this.scene.time.delayedCall(1250, () => {
            this.blockIcon.setAlpha(0)
            this.blockIcon.setPosition(400, 275)
        })
    }
}
