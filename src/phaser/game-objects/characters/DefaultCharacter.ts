import BlockBar from "../bars/BlockBar"
import HealthBar from "../bars/HealthBar"
import BattleScreen from "../scenes/BattleScreen"

export default class Character extends Phaser.GameObjects.Container {
    maxHealth: number
    currentHealth: number
    blockAmount: number
    healthBar: HealthBar
    blockBar: BlockBar

    constructor(scene: BattleScreen, maxHealth: number) {
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
        this.healthBar.updateHealth(this.currentHealth)
    }
}
