import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import Button from "./Button";

export default class AttackButton extends Button {
    damageIcon: Phaser.GameObjects.Image
    staminaIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, x: number, y: number, attack: Action) {
        super(scene, x, y, 440, 103, ``, 0xE6E6E6, 0xF80000, 10, '50px', () => {
            if (scene.player && scene.player.currentStamina >= attack.stamina) {
                scene.attackAnimation?.startAttackAnimation()
                scene.time.delayedCall(400, () => {
                    scene.player?.changeStamina(-attack.stamina)
                    scene.time.delayedCall(400, () => {
                        scene.enemy?.takeDamage(attack.value)
                    })
                })
            }
        })

        const nameText = scene.add.text(-114, 0, `${attack.name}:`, {fontSize: '50px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5, 0.5)
        
        const valueText = scene.add.text(nameText.width / 2 - 78, 0, `${attack.value}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)
        this.damageIcon = scene.add.image(nameText.width / 2 - 23, -2, 'damage-icon').setScale(0.24)


        const staminaText = scene.add.text(nameText.width / 2 + 43, 0, `${attack.stamina}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)
        this.staminaIcon = scene.add.image(nameText.width / 2 + 95, -2, 'stamina-icon').setScale(0.21)


        this.add(nameText)
        this.add(this.damageIcon)
        this.add(valueText)
        this.add(this.staminaIcon)
        this.add(staminaText)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            this.damageIcon.setScale(0.3)
            this.staminaIcon.setScale(0.26)
          })
            
          this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            this.damageIcon.setScale(0.24)
            this.staminaIcon.setScale(0.21)
          })
    }
}