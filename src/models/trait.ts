export interface Effect {
    idEffect: number;
    style: number;
    description: string;
    maxUnits: number;
    minUnits: number;
}

export interface Trait {
    _id: string;
    id: string;
    name: string;
    description: string;
    type: string;
    tier: string;
    effects: Effect[];
    topFour: number;
    winRate: number;
    averagePlacement: number;
    playRate: number;
}