import Character from "./DefaultCharacter";

export default class Enemy extends Character {
    intent: {action: string, value: number}

    constructor(name: string, maxHealth: number) {
        super(name, maxHealth)
        this.intent = {action: "Attack", value: 5}
    }

    randomizeIntent() {
        const actions = [{ action: "Attack", value: 5}, {action: "Block", value: 3}]
        this.intent = actions[Math.floor(Math.random() * actions.length)]
    }

    useTurn() {
        if (this.intent.action === "Block") {
            this.block(this.intent.value)
        } else if (this.intent.action === "Attack") {
            return this.intent.value
        }
        return 0
    }
}
