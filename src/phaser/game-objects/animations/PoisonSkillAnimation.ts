import FirstBattle from "../../scenes/FirstBattle"
import Character from "../characters/DefaultCharacter"
import Player from "../characters/Player"

export default class poisonSkillAnimation extends Phaser.GameObjects.Container {
    character: Character | undefined = undefined
    poisonIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, character: Character) {
        super(scene, 0, 0)
        this.character = character
        
        this.poisonIcon = scene.add.image(375, 200, 'poison-icon').setScale(0.3)
        scene.add.existing(this.poisonIcon)
        this.poisonIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startSkillAnimation() {
        if (this.character instanceof Player) {
            this.poisonIcon.flipX = false
            this.poisonIcon.setPosition(375, 200)
            this.scene.tweens.add({targets: this.poisonIcon, x: 625, duration: 900, ease: 'Linear'})
            this.scene.tweens.add({targets: this.poisonIcon, alpha: 1, duration: 500, ease: 'Linear'})

            this.scene.time.delayedCall(1100, () => {
                this.poisonIcon.setAlpha(0)
            })
        } else {
            this.poisonIcon.setPosition(625, 200)
            this.poisonIcon.flipX = true
            this.scene.tweens.add({targets: this.poisonIcon, x: 375, duration: 900, ease: 'Linear'})
            this.scene.tweens.add({targets: this.poisonIcon, alpha: 1, duration: 500, ease: 'Linear'})

            this.scene.time.delayedCall(1100, () => {
                this.poisonIcon.setAlpha(0)
            })
        }
    }
}

