interface Action {
    name: string
    action: string
    value: number
    stamina: number
}

interface EnemyIntent {
    action: string
    value: number
}

interface PlayerState {
    maxHealth: number
    currentHealth: number
    maxStamina: number
    attacks: [Action, Action?, Action?]
    defends: [Action, Action?, Action?]
    skills: [Action?, Action?, Action?] | undefined
    coinAmount: number
    eventCount: number
}

export type {Action, EnemyIntent, PlayerState}