import AttackAnimation from "../game-objects/animations/AttackAnimation"
import BlockAnimation from "../game-objects/animations/BlockAnimation"
import SkillAnimation from "../game-objects/animations/SkillAnimation"
import PurpleCircle from "../game-objects/characters/PurpleCircle"
import FirstBattle from "./FirstBattle"

class WorldOneBattle extends FirstBattle {
    constructor() {
        super('WorldOneBattle')
    }
    
    preload() {
        super.preload()
    }

    create() {
        this.saveGameState()
        super.create()
        this.loadGameState()

        this.enemy = new PurpleCircle(this)

        if (this.enemy) {
            this.enemyAttackAnimation = new AttackAnimation(this, this.enemy)
            this.enemyBlockAnimation = new BlockAnimation(this, this.enemy)
            this.enemyElementAnimation = new SkillAnimation(this, this.enemy)
        }
    }

    update() {
        super.update()
    }
}

export default WorldOneBattle