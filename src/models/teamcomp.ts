export interface Position {
    x: number;
    y: number;
}

export interface Data {
    item: string[];
    champion_id: string;
    champion_star: number;
    headliner: string;
}

export interface Map {
   
    pos: Position;
    data: Data;
}

export interface Formation {
    plan: string;
    map: Map[];
}

export interface AugumentSuggestion {
    tier: number;
    augument_selected: string[];
}

export interface MetaContent {
    title: string;
    info: string;
    augument_suggestion: AugumentSuggestion[];
}

export interface AdditionalCompTip {
    tip: string;
}

export interface PlanNote {
    stage: string;
    note: string[] | null;
}

export interface TeamComp {
  [x: string]: any;
    _id: string;
    meta_content: MetaContent;
    fomation: Formation[];
    when_to_make: string;
    how_to_play: string;
    additional_comp_tips: AdditionalCompTip[];
    plan_note: PlanNote[];
    updatedAt: string;   
rate_of_difficul:string;
    playstyle:string;
    idComp:number;
}
export interface MyMap {
   
    pos: Position;
    data: Data;
  }