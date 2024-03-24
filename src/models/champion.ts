
export interface Champion {
    _id: string;
    id: string;
    name: string;
    tier: string;
    cost: number;
    origin: string;
    championClass: string;
    health: string;
    mana: number;
    startingMana: number;
    attackDamage: string;
    attackSpeed: number;
    dps: string;
    attackRange: number;
    armor: number;
    magicResist: number;
    status: object;
    items: string;
    abilityName: string;
    abilityDescription: string;
    statusDescriptions: string[];
    costReal: number;
    origins: string[];
    classes: string[];
    tierOrder: number;
    health_value: number;
    dps_value: number;
    attack_damage_value: number;
    topFour: number;
    winRate: number;
    averagePlacement: number;
    playRate: number;
}

export interface RelativeChampion {
    trait: string;
    championRelative:Champion[];
}