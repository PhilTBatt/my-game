import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import AttackTooltip from "../tooltips/AttackTooltip";
import StaminaTooltip from "../tooltips/StaminaTooltip";
import Button from "./Button";

export default class AttackButton extends Button {
    damageIcon: AttackTooltip
    staminaIcon: StaminaTooltip

    constructor(scene: FirstBattle, x: number, y: number, attack: Action) {
        super(scene, x, y, 440, 103, ``, '#000000', 0xE6E6E6, 0xF80000, 10, '50px', () => {
            if (scene.player && scene.player.currentStamina >= attack.stamina) {
                scene.attackAnimation?.startAttackAnimation()
                scene.time.delayedCall(475, () => {
                    scene.player?.changeStamina(-attack.stamina)
                    scene.time.delayedCall(450, () => {
                        scene.enemy?.takeDamage(attack.value)
                    })
                })
            }
        })

        const nameText = scene.add.text(-114, 0, `${attack.name}:`, {fontSize: '50px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5, 0.5)
        
        const valueText = scene.add.text(nameText.width / 2 - 78, 0, `${attack.value}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)

        this.damageIcon = new AttackTooltip(scene, nameText.width / 2 + x + 476, y + 136, nameText.width / 2 + x + 425, y + 21)
        this.damageIcon.setDepth(2)
        this.damageIcon.setVisible(false)

        
        const staminaText = scene.add.text(nameText.width / 2 + 50, 0, `${attack.stamina}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)

        this.staminaIcon = new StaminaTooltip(scene, nameText.width / 2 + x + 600, y + 135, nameText.width / 2 + x + 598, y - 6)
        this.staminaIcon.setDepth(2)
        this.staminaIcon.setVisible(false)

        this.add([nameText, valueText, staminaText])
        scene.add.existing(this.damageIcon)
        scene.add.existing(this.staminaIcon)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            this.damageIcon.icon?.setScale(0.3)
            this.staminaIcon.icon?.setScale(0.27)
          })
            
          this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            this.damageIcon.icon?.setScale(0.26)
            this.staminaIcon.icon?.setScale(0.22)
          })
    }
}