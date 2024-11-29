import Button from "./Button";

export default class StatsButton extends Button {
    constructor(scene: Phaser.Scene) {
        super(scene, 500, 180, 400, 120, 'Stats', 0xEBE846, 0xF80000, '50px', () => {})
    }
}