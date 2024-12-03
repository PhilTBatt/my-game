import Button from "../buttons/Button";
import FirstBattle from "../../scenes/FirstBattle";

export default class DefaultButtonPanel extends Phaser.GameObjects.Container {
    attacksButton: Button
    defendsButton: Button
    skillButton: Button
    statsButton: Button
    
    constructor(scene: FirstBattle) {
        super(scene, 0, 0)
        
        this.attacksButton = new Button(scene, 257, 398, 440, 103, 'Attacks', 0xE6E6E6, 0xF80000, 10, '80px',  () => {
            this.setVisible(false)
            scene.attackButtonPanel?.setVisible(true)
        })
        this.add(this.attacksButton)

        this.defendsButton = new Button(scene, 743, 398, 440, 103, 'Defends', 0xE6E6E6, 0x003EF8, 10, '80px', () => {
            this.setVisible(false)
            scene.defendButtonPanel?.setVisible(true)
        })
        this.add(this.defendsButton)

        this.skillButton = new Button(scene, 257, 527, 440, 103, 'Skills', 0xE6E6E6, 0x00FF00, 10, '80px', () => {
            this.setVisible(false)
            scene.skillButtonPanel?.setVisible(true)
        })
        this.add(this.skillButton)

        this.statsButton = new Button(scene, 743, 527, 440, 105, 'Stats', 0xE6E6E6, 0xFFFF00, 10, '80px', () => {
            this.setVisible(false)
            scene.statsButtonPanel?.setVisible(true)
        })
        this.add(this.statsButton)

        scene.add.existing(this)
    }
}