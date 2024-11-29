import Button from "./Button";

export default class DefendButton extends Button {
    constructor(scene: Phaser.Scene) {
        super(scene, 100, 60, 400, 120, 'Defend', 0x00E162, 0xF80000, '50px', () => {})
    }
}