import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Button from "../buttons/Button";

export default class BackButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number, onClick: () => void, button: Button, buttonPanel: DefaultButtonPanel) {
        super(scene, x, y, 300, 100, 'Back', 0xE6E6E6, 0x808080, '50px', onClick)
        
    }
}