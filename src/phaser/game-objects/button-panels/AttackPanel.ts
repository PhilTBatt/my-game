import FirstBattle from "../../scenes/FirstBattle";
import AttackButton from "../buttons/AttackButton";
import BackButton from "../buttons/BackButton";

export default class AttackButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    attack1: AttackButton | undefined = undefined
    attack2: AttackButton | undefined = undefined
    attack3: AttackButton | undefined = undefined
    
    constructor(scene: FirstBattle) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene,  257, 398, 0xF80000,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
            scene.attackButtonPanel?.attack1?.damageIcon.setVisible(false)
            scene.attackButtonPanel?.attack2?.damageIcon.setVisible(false)
            scene.attackButtonPanel?.attack3?.damageIcon.setVisible(false)
        })

        this.add(this.backButton)

        if (scene.player?.attacks) {
            scene.player.attacks.forEach((attack, index) => {
                if (index === 0 && attack) {
                    this.attack1 = new AttackButton(scene, 743, 398, attack)
                    this.add(this.attack1)
                }
                if (index === 1 && attack) {
                    this.attack2 = new AttackButton(scene, 257, 527, attack)
                    this.add(this.attack2)
                }
                if (index === 2 && attack) {
                    this.attack3 = new AttackButton(scene, 743, 527, attack)
                    this.add(this.attack3)
                }
            })
        }

        this.setSize(1000, 275)
        scene.add.existing(this)
        this.setVisible(false)
    }

    disableButtons() {
        this.backButton.disableInteractive()
        this.attack1?.disableInteractive()
        this.attack2?.disableInteractive()
        this.attack3?.disableInteractive()
    }

    enableButtons() {
        this.backButton.setInteractive()
        this.attack1?.setInteractive()
        this.attack2?.setInteractive()
        this.attack3?.setInteractive()
    }
}