import Tooltip from "./BasicTooltip";

export default class AttackTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined = undefined
    tooltip: Tooltip | undefined = undefined

    constructor(scene: Phaser.Scene, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'damage-icon').setScale(0.26).setOrigin(0.5)
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
}