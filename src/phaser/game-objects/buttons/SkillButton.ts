import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import FireTooltip from "../tooltips/FireTooltip";
import FrostTooltip from "../tooltips/FrostTooltip";
import PoisonTooltip from "../tooltips/PoisonTooltip";
import ShockTooltip from "../tooltips/ShockTooltip";
import Button from "./Button";

export default class SkillButton extends Button {
    elementIcon: FireTooltip | FrostTooltip | PoisonTooltip | ShockTooltip
    staminaIcon: Phaser.GameObjects.Image

    constructor(scene: FirstBattle, x: number, y: number, skill: Action) {
        super(scene, x, y, 440, 103, '', '#000000', 0xE6E6E6, 0x00FF00, 10, '50px', () => {
            if (scene.player && scene.player.currentStamina >= skill.stamina) {
                scene.elementAnimation?.startSkillAnimation(scene, skill)
                scene.time.delayedCall(475, () => {
                    scene.player?.changeStamina(-skill.stamina)
                    scene.time.delayedCall(450, () => {
                        scene.enemy?.inflictStatusCondition(scene, skill.action.toLowerCase() as 'burn' | 'frost' | 'poison' | 'shock', skill.value)
                    })
                })
            }
        })

        const nameText = scene.add.text(-112, 0, `${skill.name}:`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5)
        
        const valueText = scene.add.text(nameText.width / 2 - 75, 0, `${skill.value}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)

        if (skill.action === 'Burn') {
            this.elementIcon = new FireTooltip(scene, nameText.width / 2 + x + 475, y + 136, nameText.width / 2 + x + 415, y + 2)
            this.elementIcon.icon?.setScale(0.275)
        } else if (skill.action === 'Frost') {
            this.elementIcon = new FrostTooltip(scene, nameText.width / 2 + x + 475, y + 136, nameText.width / 2 + x + 415, y + 2)
            this.elementIcon.icon?.setScale(0.275)
        } else if (skill.action === 'Poison') {
            this.elementIcon = new PoisonTooltip(scene, nameText.width / 2 + x + 475, y + 136, nameText.width / 2 + x + 415, y + 2)
            this.elementIcon.icon?.setScale(0.175)
        } else {
            this.elementIcon = new ShockTooltip(scene, nameText.width / 2 + x + 475, y + 136, nameText.width / 2 + x + 415, y + 2)
            this.elementIcon.icon?.setScale(0.1475)
        }
        this.elementIcon.setDepth(2)
        this.elementIcon.setVisible(false)

        const staminaText = scene.add.text(nameText.width / 2 + 40, 0, `${skill.stamina}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)
        this.staminaIcon = scene.add.image(nameText.width / 2 + 93, -2, 'stamina-icon').setScale(0.22)

        this.add([nameText, valueText, this.staminaIcon, staminaText])
        scene.add.existing(this.elementIcon)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            skill.action === 'Burn' || skill.action === 'Frost' ? this.elementIcon.icon?.setScale(0.325) : 
                skill.action === 'Poison' ? this.elementIcon.icon?.setScale(0.2) : this.elementIcon.icon?.setScale(0.175)
            this.staminaIcon.setScale(0.26)
        })
            
        this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            skill.action === 'Burn' || skill.action === 'Frost' ? this.elementIcon.icon?.setScale(0.275) : 
            skill.action === 'Poison' ? this.elementIcon.icon?.setScale(0.175) : this.elementIcon.icon?.setScale(0.1475)
            this.staminaIcon.setScale(0.22)
        })
    }
}




