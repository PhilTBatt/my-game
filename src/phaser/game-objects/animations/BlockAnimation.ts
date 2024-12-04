import FirstBattle from "../../scenes/FirstBattle"
import Character from "../characters/DefaultCharacter"
import Player from "../characters/Player"

export default class BlockAnimation extends Phaser.GameObjects.Container {
    blockIcon: Phaser.GameObjects.Image
    character: Character | undefined = undefined

    constructor(scene: FirstBattle, character: Character) {
        super(scene, 0, 0)
        this.character = character
        
        this.blockIcon = scene.add.image(400, 275, 'block-icon').setScale(0.3)
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

        if (this.character instanceof Player) {
            this.blockIcon.setPosition(400, 275)
            this.scene.tweens.add({targets: this.blockIcon, y: 200, duration: 900, ease: 'Linear'})
        } else {
            this.blockIcon.setPosition(600, 275)
            this.scene.tweens.add({targets: this.blockIcon, y: 200, duration: 900, ease: 'Linear'})
        }
        
        this.scene.tweens.add({targets: this.blockIcon, alpha: 1, duration: 500, ease: 'Linear'})

        this.scene.time.delayedCall(800, () => {
            this.scene.tweens.add({targets: this.blockIcon, alpha: 0, duration: 250, ease: 'Linear'})
        })
    }
}
