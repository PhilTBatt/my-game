import BattleScreen from "../../scenes/BattleScreen"

export default class AttackAnimation extends Phaser.GameObjects.Container {
    damageIcon: Phaser.GameObjects.Image

    constructor(scene: BattleScreen) {
        super(scene, 0, 0)

        this.damageIcon = scene.add.image(375, 200, 'damage-icon').setScale(0.3)
        scene.add.existing(this.damageIcon)
        this.damageIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startAttackAnimation() {
        this.scene.tweens.add({targets: this.damageIcon, x: 625, duration: 900, ease: 'Linear'})
        this.scene.tweens.add({targets: this.damageIcon, alpha: 1, duration: 500, ease: 'Linear'})

        this.scene.time.delayedCall(1250, () => {
            this.damageIcon.setAlpha(0)
            this.damageIcon.setPosition(350, 200)
        })
    }
}
