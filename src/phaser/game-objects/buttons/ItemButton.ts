import Button from "./Button";

export default class ItemButton extends Button {
    constructor(scene: Phaser.Scene) {
        super(scene, 100, 180, 400, 120, 'Item', 0x003EF8, 0xF80000, '50px', () => {})
    }
}