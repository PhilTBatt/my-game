import FirstBattle from "../../scenes/FirstBattle";
import Enemy from "./DefaultEnemy";

export default class PurpleCircle extends Enemy {
    constructor(scene: FirstBattle) {
        super(scene, 50)

        this.sprite?.destroy()
        this.sprite  = scene.add.image(733.33, 200, 'second-enemy-icon').setScale(0.25).setOrigin(0.5)

        this.intent = {action: "Block", value: 8}
        this.enemyIntentBar.updateIntent(this.intent)
        this.intents = [{action: "Attack", value: 7}, {action: "Block", value: 8}, {action: "Poison", value: 2}]

        scene.add.existing(this)
    }
}
