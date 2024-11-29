import Character from "./DefaultCharacter";

export default class Enemy extends Character {
    intent: {action: string, value: number}
    sprite: Phaser.GameObjects.Graphics

    constructor(scene: Phaser.Scene, name: string, maxHealth: number) {
        super(scene, name, maxHealth)
        this.intent = {action: "Attack", value: 5}

        this.sprite = scene.add.graphics()
        this.sprite.fillStyle(0xB30003, 1)
        this.sprite.fillCircle(725, 185, 50)
        this.sprite.lineStyle(5, 0x000000)
        this.sprite.strokeCircle(725, 185, 50)
        scene.add.existing(this.sprite)

        this.healthBar.setPosition(450, -75)
    }

    randomizeIntent() {
        const actions = [{ action: "Attack", value: 5}, {action: "Block", value: 3}]
        this.intent = actions[Math.floor(Math.random() * actions.length)]
    }

    useTurn() {
        if (this.intent.action === "Block") {
            this.block(this.intent.value)
        } else if (this.intent.action === "Attack") {
            return this.intent.value
        }
        return 0
    }
}
