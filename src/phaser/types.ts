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

export type {Action, EnemyIntent}