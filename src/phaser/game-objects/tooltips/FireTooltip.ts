import FirstBattle from "../../scenes/FirstBattle";
import Tooltip from "./BasicTooltip";

export default class FireTooltip extends Phaser.GameObjects.Container {
    icon: Phaser.GameObjects.Image | undefined
    tooltip: Tooltip | undefined

    constructor(scene: FirstBattle, iconX: number, iconY: number, tooltipX: number, tooltipY: number) {
        super(scene, 0, 0)

        this.icon = scene.add.image(iconX, iconY, 'fire-icon').setScale(0.3).setOrigin(0.5)
        this.icon.setInteractive()
        this.add(this.icon)

        scene.add.existing(this)

        this.icon.on('pointerover', () => {
            const text = 'End of turn:\nLose X hp\nLose 1 stack'
            
            if (scene.rewardBox) {
                if (this === scene.rewardBox.reward1?.elementIcon) this.tooltip = new Tooltip(scene, 500, 115, 115, 90, 'Fire', text, 'fire-icon', 0xFF0000)
                else this.tooltip = new Tooltip(scene, 500, 255, 115, 90, 'Fire', text, 'fire-icon', 0xFF0000)
            }
            else this.tooltip = new Tooltip(scene, tooltipX, tooltipY, 115, 90, 'Fire', text, 'fire-icon', 0xFF0000)
                        
            this.tooltip.setDepth(104)
            this.tooltip.icon?.setScale(0.12)
            scene.add.existing(this)
        })
                
        this.icon.on('pointerout', () => this.tooltip?.destroy())
    }
}