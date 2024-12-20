import FirstBattle from "../../scenes/FirstBattle";
import { Action } from "../../types";
import BlockTooltip from "../tooltips/BlockTooltips";
import StaminaTooltip from "../tooltips/StaminaTooltip";
import Button from "./Button";

export default class DefendButton extends Button {
    blockIcon: BlockTooltip
    staminaIcon: StaminaTooltip

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
        nameText.setOrigin(0.5)

        const valueText = scene.add.text(nameText.width / 2 - 78, 0, `${defend.value}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        valueText.setOrigin(0.5)

        this.blockIcon = new BlockTooltip(scene, nameText.width / 2 + x + 475, y + 136, nameText.width / 2 + x + 415, y + 7)
        this.blockIcon.setDepth(2).setVisible(false)
        this.blockIcon.icon?.setScale(0.16)

        const staminaText = scene.add.text(nameText.width / 2 + 50, 0, `${defend.stamina}`, {fontSize: '55px', color: '#000000', fontFamily: 'Arial'})
        staminaText.setOrigin(0.5)

        this.staminaIcon = new StaminaTooltip(scene, nameText.width / 2 + x + 600, y + 135, nameText.width / 2 + x + 598, y - 6)
        this.staminaIcon.setDepth(2)
        this.staminaIcon.setVisible(false)

        this.add([nameText, valueText, staminaText])
        scene.add.existing(this.blockIcon)
        scene.add.existing(this.staminaIcon)

        this.on('pointerover', () => {
            nameText.setScale(1.1)
            valueText.setScale(1.15)
            staminaText.setScale(1.15)
            this.blockIcon.icon?.setScale(0.19)
            this.staminaIcon.icon?.setScale(0.27)
          })
            
          this.on('pointerout', () => {
            nameText.setScale(1)
            valueText.setScale(1)
            staminaText.setScale(1)
            this.blockIcon.icon?.setScale(0.16)
            this.staminaIcon.icon?.setScale(0.22)
          })
    }
}