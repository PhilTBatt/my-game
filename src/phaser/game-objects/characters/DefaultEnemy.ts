import { EnemyIntent } from "../../types";
import EnemyIntentBar from "../bars/EnemyIntentBar";
import BattleScreen from "../../scenes/BattleScreen";
import Character from "./DefaultCharacter";

export default class Enemy extends Character {
    intent: EnemyIntent
    sprite: Phaser.GameObjects.Graphics
    enemyIntentBar: EnemyIntentBar
    scene: BattleScreen

    constructor(scene: BattleScreen, maxHealth: number) {
        super(scene, maxHealth)
        this.scene =  scene
        
        this.intent = {action: "Attack", value: 5}

        this.sprite = scene.add.graphics()
        this.sprite.fillStyle(0xB30003, 1)
        this.sprite.fillCircle(733.33, 200, 60)
        this.sprite.lineStyle(5, 0x000000)
        this.sprite.strokeCircle(733.33, 200, 60)
        scene.add.existing(this.sprite)

        this.healthBar.setPosition(466.66, 0)
        this.blockBar.setPosition(466.66, 0)

        this.enemyIntentBar = new EnemyIntentBar(scene, this.intent)
        scene.add.existing(this.enemyIntentBar)

        scene.add.existing(this)
    }

    randomizeIntent() {
        const actions = [{ action: "Attack", value: 5}, {action: "Block", value: 4}]
        this.intent = actions[Math.floor(Math.random() * actions.length)]
        this.enemyIntentBar.updateIntent(this.intent)
    }

    useTurn() {
        this.blockAmount = 0
        this.blockBar.updateBlock(this.blockAmount)

        if (this.intent.action === "Block") {
            this.block(this.intent.value)
        } else if (this.intent.action === "Attack") {
            this.scene.player!.takeDamage(this.intent.value)
        }
        this.randomizeIntent()
    }
}
