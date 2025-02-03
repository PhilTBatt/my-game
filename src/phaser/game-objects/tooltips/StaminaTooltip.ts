import Tooltip from "./BasicTooltip";

export default class StaminaTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: Phaser.Scene, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'stamina-icon').setScale(0.22).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'Needed to use moves\nRecharges at the beginning of turn'
            this.tooltip = new Tooltip(scene, tooltipX - 60, tooltipY- 30, 125, 125, 'Stamina', text, 'stamina-icon', 0xFFD11B)
            this.tooltip.setDepth(102)
            this.tooltip.icon?.setScale(0.09)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}