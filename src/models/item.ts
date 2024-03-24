export interface Item {
    _id: string;
    id: string;
    name: string;
    tier: string;
    description: string;
    components: string[];
    isBase: boolean;
    trait: string;
    categoryId: object;
    isUnique: boolean;
    effects: { [key: string]: string };
    isRadiant: boolean;
    topFour: number;
    winRate: number;
    averagePlacement: number;
    playRate: number;
}