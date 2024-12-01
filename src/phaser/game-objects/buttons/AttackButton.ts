import BattleScreen from "../scenes/BattleScreen";
import Button from "./Button";

export default class AttackButton extends Button {
    constructor(scene: BattleScreen, x: number, y: number, attackAction: string, attackValue: number, stamina: number) {
        super(scene, x, y, 400, 105, `${attackAction}: ${attackValue}`, 0xE6E6E6, 0xF80000, '60px', () => 
            scene.time.delayedCall(200, () => {}))
    }
}