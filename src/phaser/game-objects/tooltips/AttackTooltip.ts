import FirstBattle from "../../scenes/FirstBattle";
import Tooltip from "./BasicTooltip";

export default class AttackTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: FirstBattle, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'damage-icon').setScale(0.27).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'Deals damage'
            this.tooltip = new Tooltip(scene, tooltipX, tooltipY, 95, 70, 'Attack', text, 'damage-icon', 0xFF0000)
            this.tooltip.setDepth(102)
            this.tooltip.icon?.setScale(0.12)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}Tooltip(scene, tooltipX, tooltipY, 95, 70, 'Attack', text, 'damage-icon', 0xFF0000)