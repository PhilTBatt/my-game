import FirstBattle from "../../scenes/FirstBattle"
import { Action } from "../../types"
import Character from "../characters/DefaultCharacter"
import Player from "../characters/Player"

export default class SkillAnimation extends Phaser.GameObjects.Container {
    character: Character | undefined = undefined
    elementIcon: Phaser.GameObjects.Image | undefined = undefined

    constructor(scene: FirstBattle, character: Character) {
        super(scene, 0, 0)
        this.character = character

        scene.add.existing(this)
    }
    
    startSkillAnimation(scene: FirstBattle, skill: Action) {
        this.elementIcon?.destroy()
        
        if (skill.action === 'Fire') {
            this.elementIcon = scene.add.image(375, 200, 'fire-icon').setScale(0.45)
        } else if (skill.action === 'Frost') {
            this.elementIcon = scene.add.image(375, 200, 'frost-icon').setScale(0.5)
        } else if (skill.action === 'Poison') {
            this.elementIcon = scene.add.image(375, 200, 'poison-icon').setScale(0.275)
        } else {
            this.elementIcon = scene.add.image(375, 200, 'shock-icon').setScale(0.25)
        }
        
        scene.add.existing(this.elementIcon)
        this.elementIcon.setAlpha(0)

        if (this.character instanceof Player) {
            this.elementIcon.setPosition(375, 200)
            this.elementIcon.flipX = false
            this.scene.tweens.add({targets: this.elementIcon, x: 625, duration: 900, ease: 'Linear'})
        } else {
            this.elementIcon.setPosition(625, 200)
            this.elementIcon.flipX = true
            this.scene.tweens.add({targets: this.elementIcon, x: 375, duration: 900, ease: 'Linear'})
        }
        
        this.scene.tweens.add({targets: this.elementIcon, alpha: 1, duration: 500, ease: 'Linear'})
        
        this.scene.time.delayedCall(800, () => {
            this.scene.tweens.add({targets: this.elementIcon, alpha: 0, duration: 200, ease: 'Linear'})
        })
    }
}

