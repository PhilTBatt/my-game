export default class EnemyIntentBar extends Phaser.GameObjects.Container {
    enemyIntentBar: Phaser.GameObjects.Graphics
    staminaText: Phaser.GameObjects.Text
    intent: {action: string, value: number}

    constructor(scene: Phaser.Scene, x: number, y: number, intent: {action: string, value: number}) {
        super(scene, x, y)

        this.intent = intent

        this.enemyIntentBar = scene.add.graphics()
        this.enemyIntentBar.fillStyle(0xC300EA)
        this.enemyIntentBar.fillRoundedRect(195, 155, 165, 20, 20)
        this.enemyIntentBar.lineStyle(4, 0x000000)
        this.enemyIntentBar.strokeRoundedRect(195, 155, 165, 20, 20)

        this.staminaText = scene.add.text(275, 165, `${this.intent.action}: ${this.intent.value}`, {fontSize: '17px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.staminaText.setOrigin(0.5)

        this.add(this.enemyIntentBar)
        this.add(this.staminaText)
        scene.add.existing(this)
    }

    updateIntent(newIntent: {action: string, value: number}) {
        this.intent = newIntent
        this.staminaText.setText(`${this.intent.action}: ${this.intent.value}`)

        this.enemyIntentBar.clear()
        this.enemyIntentBar.fillStyle(0x40CF55)
        this.enemyIntentBar.fillRoundedRect(450, -75, 165, 18, 18)
        this.enemyIntentBar.lineStyle(5, 0x000000)
        this.enemyIntentBar.strokeRoundedRect(450, -75, 165, 18, 15)
    }
}
