import FirstBattle from "../../scenes/FirstBattle";
import Enemy from "./DefaultEnemy";

export default class PurpleCircle extends Enemy {
    constructor(scene: FirstBattle) {
        super(scene, 60)

        this.sprite.fillStyle(0xC300EA, 1)
        this.sprite.fillCircle(733.33, 200, 65)

        this.intent = {action: "Block", value: 8}
        this.intents = [{action: "Attack", value: 7}, {action: "Block", value: 8}]
    }
}
