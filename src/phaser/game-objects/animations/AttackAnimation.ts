import FirstBattle from "../../scenes/FirstBattle"
import Character from "../characters/DefaultCharacter"
import Player from "../characters/Player"

export default class AttackAnimation extends Phaser.GameObjects.Container {
    character: Character | undefined = undefined
    damageIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, character: Character) {
        super(scene, 0, 0)
        this.character = character
        
        this.damageIcon = scene.add.image(375, 200, 'damage-icon').setScale(0.3)
        scene.add.existing(this.damageIcon)
        this.damageIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startAttackAnimation() {
        if (this.character instanceof Player) {
            this.damageIcon.flipY = false
            this.damageIcon.setPosition(375, 200)
            this.scene.tweens.add({targets: this.damageIcon, x: 625, duration: 900, ease: 'Linear'})
            this.scene.tweens.add({targets: this.damageIcon, alpha: 1, duration: 500, ease: 'Linear'})

            this.scene.time.delayedCall(1100, () => {
                this.damageIcon.setAlpha(0)
            })
        } else {
            this.damageIcon.setPosition(625, 200)
            this.damageIcon.flipY = true
            this.scene.tweens.add({targets: this.damageIcon, x: 375, duration: 900, ease: 'Linear'})
            this.scene.tweens.add({targets: this.damageIcon, alpha: 1, duration: 500, ease: 'Linear'})

            this.scene.time.delayedCall(1100, () => {
                this.damageIcon.setAlpha(0)
            })
        }
    }
}

