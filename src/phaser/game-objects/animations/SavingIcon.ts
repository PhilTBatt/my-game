import FirstBattle from "../../scenes/FirstBattle"

export default class SavingIcon extends Phaser.GameObjects.Container {
    saveIcon: Phaser.GameObjects.Image
    loadingIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle) {
        super(scene, 0, 0)

        this.saveIcon = scene.add.image(25, 340, 'save-icon').setScale(0.075).setOrigin(0.5)
        scene.add.existing(this.saveIcon)
        this.saveIcon.setAlpha(0)

        this.loadingIcon = scene.add.image(70, 300, 'loading-icon').setScale(0.075).setOrigin(0.5)
        scene.add.existing(this.loadingIcon)
        this.loadingIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startSaveAnimation() {
        this.scene.tweens.add({targets: this.saveIcon, y: 300, duration: 500, ease: 'Linear'})
        this.scene.tweens.add({targets: this.saveIcon, alpha: 1, duration: 1500, ease: 'Linear'})

        this.scene.tweens.add({targets: this.loadingIcon, rotation: Phaser.Math.DegToRad(360), duration: 3000, repeat: -1, ease: 'Linear'})
        this.scene.tweens.add({targets: this.loadingIcon, alpha: 1, duration: 1500, ease: 'Linear'})

        this.scene.time.delayedCall(3000, () => {
            this.scene.tweens.add({targets: this.saveIcon, alpha: 0, duration: 500, ease: 'Linear'})
            this.scene.tweens.add({targets: this.loadingIcon, alpha: 0, duration: 500, ease: 'Linear'})
        })
    }
}
