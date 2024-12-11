import BlockBar from "../bars/BlockBar"
import HealthBar from "../bars/HealthBar"
import FirstBattle from "../../scenes/FirstBattle"

export default class Character extends Phaser.GameObjects.Container {
    scene: FirstBattle
    maxHealth: number
    currentHealth: number
    blockAmount: number = 0
    healthBar: HealthBar
    blockBar: BlockBar
    burn: number = 0
    frost: number = 0
    poison: number = 0
    shock: number = 0

    constructor(scene: FirstBattle, maxHealth: number) {
        super(scene, 0, 0)
        this.scene = scene
        this.maxHealth = maxHealth
        this.currentHealth = maxHealth

        this.healthBar = new HealthBar(scene, maxHealth, this.currentHealth)

        this.blockBar = new BlockBar(scene)
    }

    takeDamage(damage: number) {
        const reducedDamage = Math.max(damage - this.blockAmount, 0)
        this.blockAmount = Math.max(this.blockAmount - damage, 0)
        this.currentHealth = Math.max(this.currentHealth - reducedDamage, 0)

        this.blockBar.updateBlock(this.blockAmount)
        this.healthBar.updateHealth(this.scene, this, this.currentHealth)
    }

    block(block: number) {
        this.blockAmount = Math.max(this.blockAmount + block, 0)
        this.blockBar.updateBlock(this.blockAmount)
    }

    heal(amount: number) {
        this.currentHealth = Phaser.Math.Clamp(this.currentHealth + amount, 0, this.maxHealth)
        this.healthBar.updateHealth(this.scene, this, this.currentHealth)
    }

    endTurn() {
        this.heal(-this.burn - this.frost - this.poison - this.shock)
        this.burn = Math.max(this.burn - 1, 0)
        this.frost = Math.max(this.frost - 1, 0)
        this.poison = Math.max(this.poison - 1, 0)
        this.shock = Math.max(this.shock - 1, 0)

        this.healthBar.updateHealth(this.scene, this, this.currentHealth)
    }

    inflictStatusCondition(scene: FirstBattle, action: 'burn' | 'frost' | 'poison' | 'shock', value: number) {
        this[action] += value
        this.healthBar.updateHealth(scene, this, this.currentHealth)
    }
}
