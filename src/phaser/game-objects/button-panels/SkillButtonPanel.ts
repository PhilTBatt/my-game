import BackButton from "../buttons/BackButton";
import FirstBattle from "../../scenes/FirstBattle";
import SkillButton from "../buttons/SkillButton";

export default class SkillButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    skill1: SkillButton | undefined
    skill2: SkillButton | undefined
    skill3: SkillButton | undefined
    
    constructor(scene: FirstBattle) {
        super(scene, 500, 138)
        
        this.backButton = new BackButton(scene, -243, 389, 0x00FF00,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
            scene.skillButtonPanel?.skill1?.elementIcon.setVisible(false)
            scene.skillButtonPanel?.skill1?.staminaIcon.setVisible(false)
            scene.skillButtonPanel?.skill2?.elementIcon.setVisible(false)
            scene.skillButtonPanel?.skill2?.staminaIcon.setVisible(false)
            scene.skillButtonPanel?.skill3?.elementIcon.setVisible(false)
            scene.skillButtonPanel?.skill3?.staminaIcon.setVisible(false)
        })

        this.add(this.backButton)

        if (scene.player?.skills) {
            scene.player.skills.forEach((skill, index) => {
                if (index === 0 && skill) {
                    this.skill1 = new SkillButton(scene, -243, 260, skill)
                    this.add(this.skill1)
                }
                if (index === 1 && skill) {
                    this.skill2 = new SkillButton(scene, 243, 260, skill)
                    this.add(this.skill2)
                }
                if (index === 2 && skill) {
                    this.skill3 = new SkillButton(scene, 243, 389, skill)
                    this.add(this.skill3)
                }
            })
        }

        this.setSize(1000, 276)
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

    resetPanel() {
        this.setVisible(false)

        this.skill1?.elementIcon.setVisible(false)
        this.skill2?.elementIcon.setVisible(false)
        this.skill3?.elementIcon.setVisible(false)
        this.skill1?.staminaIcon.setVisible(false)
        this.skill2?.staminaIcon.setVisible(false)
        this.skill3?.staminaIcon.setVisible(false)
    }
}