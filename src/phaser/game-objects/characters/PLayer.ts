import Character from "./DefaultCharacter"

export default class Player extends Character {
    maxStamina: number
    currentStamina: number

    constructor(name: string, maxHealth: number, maxStamina: number) {
        super(name, maxHealth)
        this.maxStamina = maxStamina
        this.currentStamina = maxStamina
    }

    takeDamage(damage: number) {
        this.blockAmount = Math.max(this.blockAmount - damage, 0)
        const reducedDamage = Math.max(damage - this.blockAmount, 0)
        this.currentHealth = Math.max(this.currentHealth - reducedDamage, 0)
    }

    heal(amount: number) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount)
    }

    useStamina(amount: number) {
        this.currentStamina = Math.max(this.currentStamina - amount, 0)
    }

    regenerateStamina(amount: number) {
        this.currentStamina = Math.min(this.maxStamina, this.currentStamina + amount)
    }
}
