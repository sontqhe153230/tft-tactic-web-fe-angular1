export interface Augument {
    _id: string;
    id: string;
    name: string;
    description: string;
    icon: string;
    level: number;
    tier: string;
    heroAugmentType: object;
    topFour: number;
    winRate: number;
    averagePlacement: number;
    playRate: number;
}