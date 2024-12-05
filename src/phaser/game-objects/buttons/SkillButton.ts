import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import FireTooltip from "../ToolTips.ts/FireTooltip";
import FrostTooltip from "../ToolTips.ts/FrostTooltip";
import PoisonTooltip from "../ToolTips.ts/PoisonTooltip";
import ShockTooltip from "../ToolTips.ts/ShockTooltip";
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
                        this.inflictStatusCondition(scene, skill)
                    })
                })
            }
        })

        const nameText = scene.add.text(-112, 0, `${skill.name}:`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        nameText.setOrigin(0.5)
        
        const valueText = scene.add.text(nameText.width / 2 - 75, 0, `${skill.value}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)

        if (skill.action === 'Fire') {
            this.elementIcon = new FireTooltip(scene, nameText.width / 2 - 22, 0, 0, 0)
            this.elementIcon.icon?.setScale(0.275)

        } else if (skill.action === 'Frost') {
            this.elementIcon = new FrostTooltip(scene, nameText.width / 2 - 22, 0, 0, 0)
            this.elementIcon.icon?.setScale(0.275)
        } else if (skill.action === 'Poison') {
            this.elementIcon = new PoisonTooltip(scene, nameText.width / 2 - 22, 0, 0, 0)
            this.elementIcon.icon?.setScale(0.175)
        } else {
            this.elementIcon = new ShockTooltip(scene, nameText.width / 2 - 22, 0, 0, 0)
            this.elementIcon.icon?.setScale(0.1475)
        }
        

        const staminaText = scene.add.text(nameText.width / 2 + 40, 0, `${skill.stamina}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)
        this.staminaIcon = scene.add.image(nameText.width / 2 + 93, -2, 'stamina-icon').setScale(0.22)

        this.add([nameText, this.elementIcon, valueText, this.staminaIcon, staminaText])

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            skill.action === 'Fire' || skill.action === 'Frost' ? this.elementIcon.icon?.setScale(0.325) : 
                skill.action === 'Poison' ? this.elementIcon.icon?.setScale(0.2) : this.elementIcon.icon?.setScale(0.175)
            this.staminaIcon.setScale(0.26)
        })
            
        this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            skill.action === 'Fire' || skill.action === 'Frost' ? this.elementIcon.icon?.setScale(0.275) : 
            skill.action === 'Poison' ? this.elementIcon.icon?.setScale(0.175) : this.elementIcon.icon?.setScale(0.1475)
            this.staminaIcon.setScale(0.22)
        })
    }

    inflictStatusCondition(scene: FirstBattle, skill: Action) {
        if (scene.enemy && skill.action === 'Fire') scene.enemy.burn += skill.value
        else if (scene.enemy && skill.action === 'Frost') scene.enemy.frost += skill.value
        else if (scene.enemy && skill.action === 'Poison') scene.enemy.poison += skill.value
        else if (scene.enemy && skill.action === 'Shock') scene.enemy.shock += skill.value

        scene.enemy?.healthBar.updateHealth(scene, scene.enemy, scene.enemy.currentHealth)
    }
}




