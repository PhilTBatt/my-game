import Button from "../buttons/Button";
import FirstBattle from "../../scenes/FirstBattle";

export default class DefaultButtonPanel extends Phaser.GameObjects.Container {
    attacksButton: Button
    defendsButton: Button
    skillsButton: Button
    statsButton: Button
    
    constructor(scene: FirstBattle) {
        super(scene, 500, 138)
        
        this.attacksButton = new Button(scene, -243, 260, 440, 103, 'Attacks', '#000000', 0xE6E6E6, 0xF80000, 10, '80px',  () => {
            this.setVisible(false)
            scene.attackButtonPanel?.setVisible(true)
            scene.attackButtonPanel?.attack1?.damageIcon.setVisible(true)
            scene.attackButtonPanel?.attack2?.damageIcon.setVisible(true)
            scene.attackButtonPanel?.attack3?.damageIcon.setVisible(true)
        })
        this.add(this.attacksButton)

        this.defendsButton = new Button(scene, 243, 260, 440, 103, 'Defends', '#000000', 0xE6E6E6, 0x003EF8, 10, '80px', () => {
            this.setVisible(false)
            scene.defendButtonPanel?.setVisible(true)
            scene.defendButtonPanel?.defend1?.blockIcon.setVisible(true)
            scene.defendButtonPanel?.defend2?.blockIcon.setVisible(true)
            scene.defendButtonPanel?.defend3?.blockIcon.setVisible(true)
        })
        this.add(this.defendsButton)

        this.skillsButton = new Button(scene, -243, 389, 440, 103, 'Skills', '#000000', 0xE6E6E6, 0x00FF00, 10, '80px', () => {
            this.setVisible(false)
            scene.skillButtonPanel?.setVisible(true)
            scene.skillButtonPanel?.skill1?.elementIcon.setVisible(true)
            scene.skillButtonPanel?.skill2?.elementIcon.setVisible(true)
            scene.skillButtonPanel?.skill3?.elementIcon.setVisible(true)
        })
        this.add(this.skillsButton)

        this.statsButton = new Button(scene, 243, 389, 440, 105, 'TBD', '#000000', 0xE6E6E6, 0xFFFF00, 10, '80px', () => {
            this.setVisible(false)
            scene.statsButtonPanel?.setVisible(true)
        })
        this.add(this.statsButton)

        this.setSize(1000, 276)
        scene.add.existing(this)
    }

    disableButtons() {
        this.attacksButton.disableInteractive()
        this.defendsButton.disableInteractive()
        this.skillsButton.disableInteractive()
        this.statsButton.disableInteractive()
    }

    enableButtons() {
        this.attacksButton.setInteractive()
        this.defendsButton.setInteractive()
        this.skillsButton.setInteractive()
        this.statsButton.disableInteractive()
    }
}