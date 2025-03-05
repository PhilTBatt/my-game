import FirstBattle from "../../scenes/FirstBattle";
import Tooltip from "./BasicTooltip";

export default class BlockTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: FirstBattle, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'block-icon').setScale(0.3).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'Blocks damage\nResets at the beginning of turn\n'
            this.tooltip = new Tooltip(scene, tooltipX - 10, tooltipY - 20, 140, 105, 'Block', text, 'block-icon', 0x003EF8)
            this.tooltip.setDepth(102)
            this.tooltip.icon?.setScale(0.07)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}