import Button from "./Button";

export default class DefendButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number, defendName: string) {
        super(scene, x, y, 400, 105, defendName, 0xE6E6E6, 0x003EF8, '60px', () => {})
    }
}