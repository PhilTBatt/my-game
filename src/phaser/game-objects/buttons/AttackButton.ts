import Button from "./Button";

export default class AttackButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number, attackName: string) {
        super(scene, x, y, 400, 105, attackName, 0xE6E6E6, 0xF80000, '60px', () => {})
    }
}