import BlockBar from "../bars/BlockBar"
import HealthBar from "../bars/HealthBar"
import FirstBattle from "../../scenes/FirstBattle"

export default class Character extends Phaser.GameObjects.Container {
    maxHealth: number
    currentHealth: number
    blockAmount: number
    healthBar: HealthBar
    blockBar: BlockBar

    constructor(scene: FirstBattle, maxHealth: number) {
        super(scene, 0, 0)
        this.maxHealth = maxHealth
        this.currentHealth = maxHealth;
        this.blockAmount = 0

        this.healthBar = new HealthBar(scene, maxHealth, this.currentHealth)
        scene.add.existing(this.healthBar)

        this.blockBar = new BlockBar(scene)
        scene.add.existing(this.blockBar)
    }

    takeDamage(damage: number) {
        const reducedDamage = Math.max(damage - this.blockAmount, 0)
        this.blockAmount = Math.max(this.blockAmount - damage, 0)
        this.currentHealth = Math.max(this.currentHealth - reducedDamage, 0)

        this.blockBar.updateBlock(this.blockAmount)
        this.healthBar.updateHealth(this.currentHealth)
    }

    block(block: number) {
        this.blockAmount = Math.max(this.blockAmount + block, 0)
        this.blockBar.updateBlock(this.blockAmount)
    }

    heal(amount: number) {
        this.currentHealth = Phaser.Math.Clamp(this.currentHealth + amount, 0, this.maxHealth)
        this.healthBar.updateHealth(this.currentHealth)
    }
}
