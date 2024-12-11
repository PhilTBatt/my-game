import FirstBattle from "../../scenes/FirstBattle";
import Enemy from "./DefaultEnemy";

export default class PurpleCircle extends Enemy {
    constructor(scene: FirstBattle) {
        super(scene, 60)

        this.sprite.fillStyle(0xC300EA, 1)
        this.sprite.fillCircle(733.33, 200, 65)
        this.sprite.lineStyle(5, 0x000000)
        this.sprite.strokeCircle(733.33, 200, 65)

        this.intent = {action: "Block", value: 8}
        this.enemyIntentBar.updateIntent(this.intent)
        this.intents = [{action: "Attack", value: 7}, {action: "Block", value: 8}, {action: "Poison", value: 2}]

        scene.add.existing(this)
    }
}
