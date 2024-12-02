import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import Button from "./Button";

export default class DefendButton extends Button {
    blockIcon: Phaser.GameObjects.Image 
    staminaIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, x: number, y: number, defend: Action) {
        super(scene, x, y, 440, 103, ``, 0xE6E6E6, 0x003EF8, 10, '70px', () => {
            if (scene.player && scene.player.currentStamina >= defend.stamina) {
                scene.blockAnimation?.startBlockAnimation()
                scene.time.delayedCall(400, () => {
                    scene.player?.changeStamina(-defend.stamina)
                    scene.time.delayedCall(400, () => {
                        scene.player?.block(defend.value)
                    })
                })
            }
        })

        const nameText = scene.add.text(-110, 0, `${defend.name}:`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5, 0.5)

        const valueText = scene.add.text(nameText.width / 2 - 75, 0, `${defend.value}`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)
        this.blockIcon = scene.add.image(nameText.width / 2 - 22, 2, 'block-icon').setScale(0.17)


        const staminaText = scene.add.text(nameText.width / 2 + 40, 0, `${defend.stamina}`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)
        this.staminaIcon = scene.add.image(nameText.width / 2 + 93, 2, 'stamina-icon').setScale(0.275)


        this.add(nameText)
        this.add(this.blockIcon)
        this.add(valueText)
        this.add(this.staminaIcon)
        this.add(staminaText)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            this.blockIcon.setScale(0.21)
            this.staminaIcon.setScale(0.325)
          })
            
          this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            this.blockIcon.setScale(0.17)
            this.staminaIcon.setScale(0.275)
          })
    }
}