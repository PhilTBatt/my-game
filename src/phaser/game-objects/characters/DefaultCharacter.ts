export default class Character {
    name: string
    maxHealth: number
    currentHealth: number
    blockAmount: number

    constructor(name: string, maxHealth: number) {
        this.name = name
        this.maxHealth = maxHealth
        this.currentHealth = maxHealth;
        this.blockAmount = 0
    }

    takeDamage(damage: number) {
        this.blockAmount = Math.max(this.blockAmount - damage, 0)
        const reducedDamage = Math.max(damage - this.blockAmount, 0)
        this.currentHealth = Math.max(this.currentHealth - reducedDamage, 0)
    }

    block(block: number) {
        this.blockAmount += block
    }

    heal(amount: number) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount)
    }
}
