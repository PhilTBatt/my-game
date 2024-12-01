import BattleScreen from "../scenes/BattleScreen";
import Button from "./Button";

export default class DefendButton extends Button {
    constructor(scene: BattleScreen, x: number, y: number, defendName: string) {
        super(scene, x, y, 440, 103, defendName, 0xE6E6E6, 0x003EF8, 10, '70px', () => scene.time.delayedCall(200, () => {}))
    }
}