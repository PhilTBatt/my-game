import FirstBattle from "../../scenes/FirstBattle";
import Tooltip from "./BasicTooltip";

export default class StaminaTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: FirstBattle, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'stamina-icon').setScale(0.22).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'Needed to use moves\nRecharges at the beginning of turn'
            
            if (scene.rewardBox) {
                if (this === scene.rewardBox.reward1?.staminaIcon) this.tooltip = new Tooltip(scene, 600, 80, 125, 125, 'Stamina', text, 'stamina-icon', 0xFFD11B)
                else this.tooltip = new Tooltip(scene, 600, 220, 125, 125, 'Stamina', text, 'stamina-icon', 0xFFD11B)
            }
            else this.tooltip = new Tooltip(scene, tooltipX - 60, tooltipY - 30, 125, 125, 'Stamina', text, 'stamina-icon', 0xFFD11B)
                        
            this.tooltip.setDepth(104)
            this.tooltip.icon?.setScale(0.09)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}