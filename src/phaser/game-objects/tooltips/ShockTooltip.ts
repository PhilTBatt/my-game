import Tooltip from "./BasicTooltip";

export default class ShockTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: Phaser.Scene, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'shock-icon').setScale(0.3).setOrigin(0.5)
        this.icon.setInteractive()
        this.icon?.setScale(0.18)
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'End of turn:\nLose X hp\nLose 1 stack'
            this.tooltip = new Tooltip(scene, tooltipX, tooltipY, 115, 90, 'Shock', text, 'shock-icon', 0xFFFF00)
            this.tooltip.setDepth(102)
            this.tooltip.icon?.setScale(0.07)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}
