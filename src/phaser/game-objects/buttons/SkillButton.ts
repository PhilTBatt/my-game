import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import Button from "./Button";

export default class SkillButton extends Button {
    elementIcon: Phaser.GameObjects.Image
    staminaIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, x: number, y: number, skill: Action) {
        super(scene, x, y, 440, 103, '', 0x003EF8, 0xF80000, 10, '50px', () => {
            if (scene.player && scene.player.currentStamina >= skill.stamina) {
                scene.skillAnimation?.startskillAnimation()
                scene.time.delayedCall(400, () => {
                    scene.player?.changeStamina(-skill.stamina)
                    scene.time.delayedCall(400, () => {
                        scene.enemy?.takeDamage(skill.value)
                    })
                })
            }
        })



        const nameText = scene.add.text(-112, 0, `${skill.name}:`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5)
        
        const valueText = scene.add.text(nameText.width / 2 - 75, 0, `${skill.value}`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)
        this.elementIcon = scene.add.image(nameText.width / 2 - 22, -2, `${skill.action.toUpperCase()[0] + skill.action.slice(1)}`).setScale(0.275)
        
        const staminaText = scene.add.text(nameText.width / 2 + 40, 0, `${skill.stamina}`, {fontSize: '60px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)
        this.staminaIcon = scene.add.image(nameText.width / 2 + 93, -2, 'stamina-icon').setScale(0.275)

        this.add(nameText)
        this.add(this.elementIcon)
        this.add(valueText)
        this.add(this.staminaIcon)
        this.add(staminaText)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            this.elementIcon.setScale(0.325)
            this.staminaIcon.setScale(0.325)
        })
            
        this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            this.elementIcon.setScale(0.275)
            this.staminaIcon.setScale(0.275)
        })
    }
}




