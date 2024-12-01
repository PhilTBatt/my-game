export default class EnemyIntentBar extends Phaser.GameObjects.Container {
    enemyIntentBar: Phaser.GameObjects.Graphics
    staminaText: Phaser.GameObjects.Text
    intent: {action: string, value: number}

    constructor(scene: Phaser.Scene, intent: {action: string, value: number}) {
        super(scene, 0, 0)

        this.intent = intent

        this.enemyIntentBar = scene.add.graphics()
        this.enemyIntentBar.fillStyle(0xC300EA)
        this.enemyIntentBar.fillRoundedRect(645.83, 95, 175, 25, 15)
        this.enemyIntentBar.lineStyle(4, 0x000000)
        this.enemyIntentBar.strokeRoundedRect(645.83, 95, 175, 25, 20)

        this.staminaText = scene.add.text(733.33, 108, `${this.intent.action}: ${this.intent.value}`, {fontSize: '24px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.staminaText.setOrigin(0.5)

        this.add(this.enemyIntentBar)
        this.add(this.staminaText)
        scene.add.existing(this)
    }

    updateIntent(newIntent: {action: string, value: number}) {
        this.intent = newIntent
        this.staminaText.setText(`${this.intent.action}: ${this.intent.value}`)

        this.enemyIntentBar.clear()
        this.enemyIntentBar.fillStyle(0xC300EA)
        this.enemyIntentBar.fillRoundedRect(645.83, 95, 175, 25, 15)
        this.enemyIntentBar.lineStyle(4, 0x000000)
        this.enemyIntentBar.strokeRoundedRect(645.83, 95, 175, 25, 20)
    }
}
