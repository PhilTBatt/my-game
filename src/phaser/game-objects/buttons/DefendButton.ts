import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import Button from "./Button";

export default class DefendButton extends Button {
    blockIcon: Phaser.GameObjects.Image 
    staminaIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, x: number, y: number, defend: Action) {
        super(scene, x, y, 440, 103, ``, '#000000', 0xE6E6E6, 0x003EF8, 10, '70px', () => {
            if (scene.player && scene.player.currentStamina >= defend.stamina) {
                scene.blockAnimation?.startBlockAnimation()
                scene.time.delayedCall(475, () => {
                    scene.player?.changeStamina(-defend.stamina)
                    scene.time.delayedCall(450, () => {
                        scene.player?.block(defend.value)
                    })
                })
            }
        })

        const nameText = scene.add.text(-114, 0, `${defend.name}:`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5, 0.5)

        const valueText = scene.add.text(nameText.width / 2 - 78, 0, `${defend.value}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)
        this.blockIcon = scene.add.image(nameText.width / 2 - 23, 0, 'block-icon').setScale(0.145)


        const staminaText = scene.add.text(nameText.width / 2 + 43, 0, `${defend.stamina}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)
        this.staminaIcon = scene.add.image(nameText.width / 2 + 95, -2, 'stamina-icon').setScale(0.22)


        this.add(nameText)
        this.add(this.blockIcon)
        this.add(valueText)
        this.add(this.staminaIcon)
        this.add(staminaText)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            this.blockIcon.setScale(0.18)
            this.staminaIcon.setScale(0.26)
          })
            
          this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            this.blockIcon.setScale(0.14)
            this.staminaIcon.setScale(0.22)
          })
    }
}