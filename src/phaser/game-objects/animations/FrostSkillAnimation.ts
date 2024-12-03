import FirstBattle from "../../scenes/FirstBattle"
import Character from "../characters/DefaultCharacter"
import Player from "../characters/Player"

export default class frostSkillAnimation extends Phaser.GameObjects.Container {
    character: Character | undefined = undefined
    frostIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, character: Character) {
        super(scene, 0, 0)
        this.character = character
        
        this.frostIcon = scene.add.image(375, 200, 'frost-icon').setScale(0.3)
        scene.add.existing(this.frostIcon)
        this.frostIcon.setAlpha(0)

        scene.add.existing(this)
    }

    startSkillAnimation() {
        if (this.character instanceof Player) {
            this.frostIcon.flipX = false
            this.frostIcon.setPosition(375, 200)
            this.scene.tweens.add({targets: this.frostIcon, x: 625, duration: 900, ease: 'Linear'})
            this.scene.tweens.add({targets: this.frostIcon, alpha: 1, duration: 500, ease: 'Linear'})

            this.scene.time.delayedCall(1100, () => {
                this.frostIcon.setAlpha(0)
            })
        } else {
            this.frostIcon.setPosition(625, 200)
            this.frostIcon.flipX = true
            this.scene.tweens.add({targets: this.frostIcon, x: 375, duration: 900, ease: 'Linear'})
            this.scene.tweens.add({targets: this.frostIcon, alpha: 1, duration: 500, ease: 'Linear'})

            this.scene.time.delayedCall(1100, () => {
                this.frostIcon.setAlpha(0)
            })
        }
    }
}

