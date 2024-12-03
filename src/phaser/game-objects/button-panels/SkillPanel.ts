import BackButton from "../buttons/BackButton";
import FirstBattle from "../../scenes/FirstBattle";
import SkillButton from "../buttons/SkillButton";

export default class SkillButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    skill1: SkillButton | undefined = undefined
    skill2: SkillButton | undefined = undefined
    skill3: SkillButton | undefined = undefined
    
    constructor(scene: FirstBattle) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene, 257, 527, 0x00FF00,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
        })

        this.add(this.backButton)

        if (scene.player?.skills) {
            scene.player.skills.forEach((skill, index) => {
                if (index === 0 && skill) {
                    this.skill1 = new SkillButton(scene, 257, 398, skill)
                    this.add(this.skill1)
                }
                if (index === 1 && skill) {
                    this.skill2 = new SkillButton(scene, 743, 527, skill)
                    this.add(this.skill2)
                }
                if (index === 2 && skill) {
                    this.skill3 = new SkillButton(scene, 743, 398, skill)
                    this.add(this.skill3)
                }
            })
        }

        scene.add.existing(this)
        this.setVisible(false)
    }

    disableButtons() {
        this.backButton.disableInteractive()
        this.skill1?.disableInteractive()
        this.skill2?.disableInteractive()
        this.skill3?.disableInteractive()
    }

    enableButtons() {
        this.backButton.setInteractive()
        this.skill1?.setInteractive()
        this.skill2?.setInteractive()
        this.skill3?.setInteractive()
    }
}