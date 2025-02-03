import Tooltip from "./BasicTooltip";

export default class PoisonTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: Phaser.Scene, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'poison-icon').setScale(0.2).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'End of turn:\nLose X hp\nLose 1 stack'
            this.tooltip = new Tooltip(scene, tooltipX, tooltipY, 115, 90, 'Poison', text, 'poison-icon', 0x800080)
            this.tooltip.setDepth(102)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}
