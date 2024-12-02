import BattleScreen from "../scenes/BattleScreen";
import { Action } from "../../types";
import Button from "./Button";

export default class AttackButton extends Button {
    constructor(scene: BattleScreen, x: number, y: number, attack: Action) {
        super(scene, x, y, 440, 103, `${attack.action}: ${attack.value}`, 0xE6E6E6, 0xF80000, 10, '70px', () => 
            scene.time.delayedCall(200, () => {
                scene.enemy?.takeDamage(attack.value)
                scene.player?.changeStamina(-attack.stamina)
            }))
    }
}