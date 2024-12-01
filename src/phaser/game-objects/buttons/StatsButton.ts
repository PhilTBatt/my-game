import Button from "./Button";

export default class StatsButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 440, 103, 'Stats', 0xEBE846, 0xF80000, 10, '70px', () => {})
    }
}