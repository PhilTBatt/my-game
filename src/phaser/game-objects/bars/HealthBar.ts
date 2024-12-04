import FirstBattle from "../../scenes/FirstBattle"
import Character from "../characters/DefaultCharacter"
import Player from "../characters/Player"
import FireTooltip from "../ToolTips.ts/FireTooltip"
import FrostTooltip from "../ToolTips.ts/FrostTooltip"
import PoisonTooltip from "../ToolTips.ts/PoisonTooltip"
import ShockTooltip from "../ToolTips.ts/ShockTooltip"

export default class HealthBar extends Phaser.GameObjects.Container {
    maxHealth: number
    currentHealth: number
    healthBar: Phaser.GameObjects.Graphics
    healthText: Phaser.GameObjects.Text
    burnIcon: FireTooltip | undefined
    frostIcon: FrostTooltip | undefined
    poisonIcon: PoisonTooltip | undefined
    shockIcon: ShockTooltip | undefined

    constructor(scene: FirstBattle, maxHealth: number, currentHealth: number) {
        super(scene, 0, 0)
        this.maxHealth = maxHealth
        this.currentHealth = currentHealth

        this.healthBar = scene.add.graphics()
        this.healthBar.fillStyle(0x37FF00)
        this.healthBar.fillRoundedRect(141.67, 45, 250, 35, 20)
        this.healthBar.lineStyle(5, 0x000000)
        this.healthBar.strokeRoundedRect(141.67, 45, 250, 35, 20)

        this.healthText = scene.add.text(266.67, 63, `${this.currentHealth} / ${this.maxHealth}`, {fontSize: '33px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.healthText.setOrigin(0.5)

        this.add(this.healthBar)
        this.add(this.healthText)
        scene.add.existing(this)
    }

    updateHealth(scene: FirstBattle, character: Character, newHealth: number) {
        this.currentHealth = newHealth
        this.healthText.setText(`${this.currentHealth} / ${this.maxHealth}`)

        const healthPercentage = this.currentHealth / this.maxHealth
        this.healthBar.clear()
        this.healthBar.fillStyle(0x37FF00)

        if (healthPercentage * 250 < 20) {
            this.healthBar.fillRoundedRect(141.67, 45, 250 * healthPercentage, 35, 0)
        } else {
            this.healthBar.fillRoundedRect(141.67, 45, 250 * healthPercentage, 35, 20)
        }
        
        this.healthBar.lineStyle(5, 0x000000)
        this.healthBar.strokeRoundedRect(141.67, 45, 250, 35, 20)

        this.burnIcon?.destroy()
        this.frostIcon?.destroy()
        this.poisonIcon?.destroy()
        this.shockIcon?.destroy()

        const x = character instanceof Player ? 400 : 600

        if (scene.player && scene.player.burn > 0) this.burnIcon = new PoisonTooltip(scene, x, 45, 400, 45)
        if (scene.player && scene.player.frost > 0) this.frostIcon = new FireTooltip(scene, x, 45, 400, 45)
        if (scene.player && scene.player.poison > 0) this.poisonIcon = new FrostTooltip(scene, x, 45, 400, 45)
        if (scene.player && scene.player.shock > 0) this.shockIcon = new ShockTooltip(scene, x, 45, 400, 45)
    }
}
