import BattleScreen from "../../scenes/BattleScreen";
import { Action } from "../../types";
import Button from "./Button";

export default class DefendButton extends Button {
    constructor(scene: BattleScreen, x: number, y: number, defend: Action) {
        super(scene, x, y, 440, 103, `${defend.name}: ${defend.value}`, 0xE6E6E6, 0x003EF8, 10, '70px',
            () => scene.time.delayedCall(200, () => {
                scene.player?.block(defend.value)
                scene.player?.changeStamina(-defend.stamina)
            }))
    }
}