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
        super.create()
        this.loadGameState()

        this.enemy = new PurpleCircle(this)
    }

    update() {
        super.update()
    }
}

export default WorldOneBattle