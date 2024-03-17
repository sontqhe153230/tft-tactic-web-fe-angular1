export interface Item {
    _id: string;
    id: string;
    name: string;
    tier: string;
    description: string;
    components: object;
    isBase: boolean;
    trait: object;
    categoryId: object;
    isUnique: boolean;
    effects: { [key: string]: string };
    isRadiant: boolean;
    topFour: number;
    winRate: number;
    averagePlacement: number;
    playRate: number;
}