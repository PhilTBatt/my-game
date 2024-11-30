import Button from "../buttons/Button";

export default class BackButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number, borderColour: number, onClick: () => void) {
        super(scene, x, y, 300, 100, 'Back', 0xE6E6E6, borderColour, '50px', onClick)
        
    }
}