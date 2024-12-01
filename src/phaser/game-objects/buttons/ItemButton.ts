import Button from "./Button";

export default class ItemButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 440, 103, 'Item', 0x003EF8, 0xF80000, 10, '70px', () => {})
    }
}