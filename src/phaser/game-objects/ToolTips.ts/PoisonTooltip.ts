import Tooltip from "./BasicTooltip";

export default class PoisonTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined = undefined
    tooltip: Tooltip | undefined = undefined

    constructor(scene: Phaser.Scene, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'poison-icon').setScale(0.3).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            this.tooltip = new Tooltip(scene, tooltipX, tooltipY, 150, 100, 'Poison', "This is a poison tooltip", 'poison-icon')
            this.add(this.tooltip)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}
