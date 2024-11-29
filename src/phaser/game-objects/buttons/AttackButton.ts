import Button from "./Button";

export default class AttackButton extends Button {
    constructor(scene: Phaser.Scene) {
        super(scene, 533.33, 20, 400, 120, 'Attack', 0xE6E6E6, 0xF80000, '50px', () => {})
    }
}