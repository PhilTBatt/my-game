import BattleScreen from "../../scenes/BattleScreen"

export default class SavingIcon extends Phaser.GameObjects.Container {
    saveIcon: Phaser.GameObjects.Image
    loadingIcon: Phaser.GameObjects.Image

    constructor(scene: BattleScreen) {
        super(scene, 0, 0)

        this.saveIcon = scene.add.image(25, 350, 'save-icon').setScale(0.05).setOrigin(0.5)
        scene.add.existing(this.saveIcon)
        this.saveIcon.setAlpha(0)

        this.loadingIcon = scene.add.image(70, 300, 'loading-icon').setScale(0.075).setOrigin(0.5)
        scene.add.existing(this.loadingIcon)
        this.loadingIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startSaveAnimation() {
        this.scene.tweens.add({targets: this.saveIcon, y: 300, duration: 500, ease: 'Linear'})
        this.scene.tweens.add({targets: this.saveIcon, alpha: 1, duration: 1250, ease: 'Linear'})

        this.scene.tweens.add({targets: this.loadingIcon, rotation: Phaser.Math.DegToRad(360), duration: 5000, repeat: -1, ease: 'Linear'})
        this.scene.tweens.add({targets: this.loadingIcon, alpha: 1, duration: 1250, ease: 'Linear'})
    }
}