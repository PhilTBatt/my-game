import HealthBar from "../bars/HealthBar"

export default class Character extends Phaser.GameObjects.GameObject {
    name: string
    maxHealth: number
    currentHealth: number
    blockAmount: number
    healthBar: HealthBar

    constructor(scene: Phaser.Scene, name: string, maxHealth: number) {
        super(scene, name)
        this.name = name
        this.maxHealth = maxHealth
        this.currentHealth = maxHealth;
        this.blockAmount = 0

        this.healthBar = new HealthBar(scene, 0, -75, maxHealth, this.currentHealth)
        scene.add.existing(this.healthBar)
    }

    takeDamage(damage: number) {
        this.blockAmount = Math.max(this.blockAmount - damage, 0)
        const reducedDamage = Math.max(damage - this.blockAmount, 0)
        this.currentHealth = Math.max(this.currentHealth - reducedDamage, 0)
        this.healthBar.updateHealth(this.currentHealth)
    }

    block(block: number) {
        this.blockAmount += block
    }

    heal(amount: number) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount)
    }
}
