import { EnemyIntent } from "../../types";
import EnemyIntentBar from "../bars/EnemyIntentBar";
import FirstBattle from "../../scenes/FirstBattle";
import Character from "./DefaultCharacter";

export default class Enemy extends Character {
    sprite: Phaser.GameObjects.Image | undefined
    enemyIntentBar: EnemyIntentBar
    scene: FirstBattle
    intents: EnemyIntent[] = [{action: "Attack", value: 5}, {action: "Block", value: 4}]
    intent: EnemyIntent = {action: "Attack", value: 5}

    constructor(scene: FirstBattle, maxHealth: number) {
        super(scene, maxHealth)
        this.scene =  scene

        this.sprite  = scene.add.image(733.33, 200, 'first-enemy-icon').setScale(0.45).setOrigin(0.5)
        scene.add.existing(this.sprite)

        this.healthBar.setPosition(466.66, 0)
        this.blockBar.setPosition(466.66, 0)

        this.enemyIntentBar = new EnemyIntentBar(scene, this.intent)
        scene.add.existing(this.enemyIntentBar)

        scene.add.existing(this)
    }

    randomizeIntent() {
        this.intent = this.intents[Math.floor(Math.random() * this.intents.length)]
        this.enemyIntentBar.updateIntent(this.intent)
    }

    useTurn() {
        this.endTurn()
        this.blockAmount = 0
        this.blockBar.updateBlock(this.blockAmount)

        if (this.intent.action === "Attack") {
            this.scene.enemyAttackAnimation?.startAttackAnimation()
            this.scene.time.delayedCall(400, () => this.scene.player!.takeDamage(this.intent.value))
        } else if (this.intent.action === "Block") {
            this.scene.enemyBlockAnimation?.startBlockAnimation()
            this.scene.time.delayedCall(400, () => this.block(this.intent.value))
        } else if (this.intent.action === "Poison") {
            this.scene.enemyElementAnimation?.startSkillAnimation(this.scene, {name: 'N/A', action: this.intent.action, value: this.intent.value, stamina: 0})
            this.scene.time.delayedCall(475, () => this.scene.player?.inflictStatusCondition(this.scene, this.intent.action.toLowerCase() as 'burn' | 'frost' | 'poison' | 'shock', this.intent.value))
        }

        this.scene.time.delayedCall(1500, () => this.randomizeIntent())
    }
}
