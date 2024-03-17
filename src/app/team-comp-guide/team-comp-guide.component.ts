import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamCompServiceService } from '../../Service/TeamComp/team-comp-service.service';
import { TeamComp } from '../../models/teamcomp';
import { SynergyActive } from '../../models/SynergyActive';
import { StyleOfTrait } from '../../models/StyleOfTrait';
import { Champion } from '../../models/champion';
import { Trait } from '../../models/trait';
import { ItemServiceService } from '../../Service/Item/item-service.service';
import { AugumentServiceService } from '../../Service/Augument/augument-service.service';
import { ChampionServiceService } from '../../Service/Champion/champion-service.service';
import { TraitServiceService } from '../../Service/Trait/trait-service.service';
import { Augument } from '../../models/augument';
import { ChampionTakeItem } from '../../models/ChampionTakeItem';
import { Item } from '../../models/item';

@Component({
  selector: 'app-team-comp-guide',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './team-comp-guide.component.html',
  styleUrl: './team-comp-guide.component.css'
})
export class TeamCompGuideComponent {

  constructor(public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, private router: Router, private route2: ActivatedRoute) { }

  id: string = "";
  TeamComp: TeamComp[] = [];
  TraitList: Trait[] = [];
  suggestions: Champion[] = [];
  AugumentList: Augument[] = [];
  ItemList: Item[] = [];
  ngOnInit() {
    this.route2.params.subscribe(params => {
      this.id = params['id'];

    });
    this.championService.getChampion().subscribe(data => {
      this.suggestions = data;
    });
    this.teamcompService.getTeamComp().subscribe(data => {
      this.TeamComp = data;

    });
    this.traitService.getTrait().subscribe(data => {
      this.TraitList = data;

    });
    this.augeumentService.getAugument().subscribe(data => {
      this.AugumentList = data;

    });
    this.itemService.getItem().subscribe(data => {
      this.ItemList = data;

    });
  }
  GetBackGround() {
    var number = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp == number);
    if (teamcomp != null) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].data.headliner != "") {
          var name = teamcomp.fomation[2].map[i].data.champion_id.replace("TFT10_", "").toLocaleLowerCase();
          var url = "../../../assets/Champion/background2/" + name + ".webp";
          return "background-image: url(" + url + ")";
        }
      }
    }
    return "";
  }
  GetTitle() {
    var number = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp == number);
    if (teamcomp != null) {
      return teamcomp.meta_content.title;
    }
    return "";
  }
  GetLevelOfHard() {
    var number = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp == number);
    if (teamcomp != null) {
      return teamcomp.rate_of_difficul;
    }
    return "";
  }
  GetStyleOfLevel(level: string) {
    if (level == "Hard") {
      return "background-color: #612658; color: #e54787;";
    }
    if (level == "Medium") {
      return "background-color: #614e3c; color: #ffc306;";
    }
    if (level == "Easy") {
      return "background-color: #33504b; color: #47cc42;";
    }
    return "";
  }

  SynergyActiveList: SynergyActive[] = [];

  processedIds: Set<number> = new Set<number>();
  
  style: StyleOfTrait[] = [];
  getSynergy(): StyleOfTrait[] {
    var id = Number(this.id);
    
    let s: StyleOfTrait[] = [];
    if (!this.processedIds.has(id)) {
      let ChampionList: Champion[] = [];
      let teamcomp: TeamComp;
      var headliner = "";
      this.teamcompService.getTeamCompById(id).subscribe(data => {
        data.fomation[2].map.forEach(element => {
          if (element.data.headliner != "") {
            headliner = element.data.headliner;
          }

        })
      });
      this.teamcompService.getChampionByTeamCompId(id, "late").subscribe(data => {
        ChampionList = data;
        let SynergyActiveList: SynergyActive;
        SynergyActiveList = this.countDuplicates(ChampionList, headliner, id);


      });
      
      this.processedIds.add(id);

    }
    for (let i = 0; i < this.SynergyActiveList.length; i++) {
      if (this.SynergyActiveList[i].TeamCompId == id) {

        this.style = this.SortTraitByStyle(this.SynergyActiveList[i]);
        return this.style;
      }
    }
    return s;
  }
  
  countDuplicates(data: Champion[], headliner: string, TeamCompId: number): SynergyActive {
    const synergyActive: SynergyActive = { Synergy: {}, headliner: "", TeamCompId: 0 };

    // Count duplicates
    data.forEach(item => {
      // Count classes
      if (item.classes && Array.isArray(item.classes)) {
        item.classes.forEach(cls => {
          synergyActive.Synergy[cls] = (synergyActive.Synergy[cls] || 0) + 1;

        });
      }

      // Count origins
      if (item.origins && Array.isArray(item.origins)) {
        item.origins.forEach(origin => {
          synergyActive.Synergy[origin] = (synergyActive.Synergy[origin] || 0) + 1;

        });
      }
    });
    if (synergyActive.Synergy[headliner] !== undefined) {
      synergyActive.Synergy[headliner]++;
    } else if (synergyActive.Synergy[headliner] !== undefined) {
      synergyActive.Synergy[headliner]++;
    }
    synergyActive.headliner = headliner;
    synergyActive.TeamCompId = TeamCompId;



    this.SynergyActiveList.push(synergyActive);
    return synergyActive;
  }

  SortTraitByStyle(synergyActive: SynergyActive) {
    let styleOfTraits: StyleOfTrait[] = [];
    const classesArray = Object.entries(synergyActive.Synergy);
    classesArray.forEach(([key, value]) => {
      var trait = this.TraitList.find(x => x.id === key);
      if (trait != undefined) {
        for (let i = 0; i < trait.effects.length; i++) {
          if (trait.effects[i].minUnits <= value && value <= trait.effects[i].maxUnits) {
            if (synergyActive.headliner === key) {
              styleOfTraits.push({ name: key, style: trait.effects[i].style, headliner: synergyActive.headliner, numberActive: value });
            }
            else {
              styleOfTraits.push({ name: key, style: trait.effects[i].style, headliner: "", numberActive: value });
            }
          }
        }
      }
    });
    styleOfTraits.sort((a, b) => (a.style < b.style) ? 1 : -1);

    return styleOfTraits;


  }
  GetBadgeWithKeyValue(value: number, headliner: string) {
    if (value == 1 && headliner == "") {
      return "../../../assets/icon/BRONZE.webp";
    }
    if (value == 1 && headliner != "") {
      return "../../../assets/icon/BRONZE_headliner.webp";
    }
    if (value == 2 && headliner == "") {
      return "../../../assets/icon/SILVER.webp";
    }
    if (value == 2 && headliner != "") {
      return "../../../assets/icon/SILVER_headliner.webp";
    }
    if (value == 3 && headliner == "") {
      return "../../../assets/icon/GOLD.webp";
    }
    if (value == 3 && headliner != "") {
      return "../../../assets/icon/GOLD_headliner.webp";
    }
    if (value == 4 && headliner != "") {
      return "../../../assets/icon/GOLD_headliner.webp";
    }
    if (value == 4 && headliner == "") {
      return "../../../assets/icon/GOLD.webp";
    }
    if (value == 5 && headliner != "") {
      return "../../../assets/icon/PLATINUM__headliner.webp";
    }
    return "";
  }
  GetTraitByName(set: string) {
    let name = set.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }
  GetGeneralInfo() {
    var number = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp == number);
    if (teamcomp != null) {
      return teamcomp.meta_content.info;
    }
    return "";
  }
  getBorderSet(championId: string) {
    let championSelect: Champion | undefined;
    var five = '2px solid #fe8900';
    var four = '2px solid #f947c6';
    var three = '2px solid #0b6cc3';
    var two = '2px solid #1bc660';
    var one = '2px solid #afafaf';

    championSelect = this.suggestions.find(x => x.id == championId);

    if (championSelect?.cost === 5) {
      return five;
    }
    else if (championSelect?.cost === 4) {
      return four;
    }
    else if (championSelect?.cost === 3) {
      return three;
    }
    else if (championSelect?.cost === 2) {
      return two;
    }
    else {
      return one;
    }
  }
  CheckPosition(line: number, position: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].pos.x == position + 1 && teamcomp.fomation[2].map[i].pos.y == line) {
          return true;
        }

      }
    }
    return false
  }
  GetChampionIcon(position: number, line: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].pos.x == position + 1 && teamcomp.fomation[2].map[i].pos.y == line) {
          let name = teamcomp.fomation[2].map[i].data.champion_id.toLocaleLowerCase().replace("tft10_", "");
          return "../../../assets/Champion/icon/" + name.replaceAll(" ","") + ".webp";
        }
      }

    }
    return "";
  }
  GetStyle(position: number, line: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].pos.x == position + 1 && teamcomp.fomation[2].map[i].pos.y == line) {
          let name = teamcomp.fomation[2].map[i].data.champion_id;
          let Style = this.getBorderSet(name).replace("2px solid ", "");
          if (teamcomp.fomation[2].map[i].data.headliner != "") {
            return "url(#headlinerSynergyGradient)"
          }
          return Style;
        }
      }

    }
    return "";
  }
  GetItemById(position: number, line: number, itemPlace: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].pos.x == position + 1 && teamcomp.fomation[2].map[i].pos.y == line) {

          let itemName = teamcomp.fomation[2].map[i].data.item[itemPlace];
          if (itemName == "" || itemName == undefined || itemName == null) {
            return '';
          }

          let name = itemName.replaceAll(" ", "-").replaceAll("'", "").toLowerCase();

          return "../../../assets/Item/Combined Items/" + name + ".png";
        }
      }
    }
    return '';

  }
  GetWhenToMake() {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      return teamcomp.when_to_make;
    }
    return '';
  }
  GetHowToPlay() {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      return teamcomp.how_to_play;
    }
    return '';
  }
  SynergyActiveList2: SynergyActive[] = [];
  style2: StyleOfTrait[] = [];
  processedType: Set<number> = new Set<number>();
  GetSynergyByForm(type: number): StyleOfTrait[] {
    var id = Number(this.id);
    // Check if the id has been processed already
    let s: StyleOfTrait[] = [];
    if (!this.processedType.has(type)) {
      let ChampionList: Champion[] = [];
      let teamcomp: TeamComp;
      var headliner = "";
      this.teamcompService.getTeamCompById(id).subscribe(data => {
        data.fomation[type].map.forEach(element => {
          if (element.data.headliner != "") {
            headliner = element.data.headliner;
          }

        })
      });
      var t = "";
      if (type == 0) {
        t = "early";
      }
      if (type == 1) {
        t = "mid";
      }

      this.teamcompService.getChampionByTeamCompId(id, t).subscribe(data => {
        ChampionList = data;

        let SynergyActiveList: SynergyActive;
        SynergyActiveList = this.countDuplicates2(ChampionList, headliner, type);


      });
      // Add the id to the set of processed ids
      this.processedType.add(type);

    }
    for (let i = 0; i < this.SynergyActiveList2.length; i++) {
      if (this.SynergyActiveList2[i].TeamCompId == type) {
        this.style2 = this.SortTraitByStyle2(this.SynergyActiveList2[i]);

        return this.style2;

      }
    }
    return s;
  }
  countDuplicates2(data: Champion[], headliner: string, type: number): SynergyActive {
    const synergyActive: SynergyActive = { Synergy: {}, headliner: "", TeamCompId: 0 };

    // Count duplicates
    data.forEach(item => {
      // Count classes
      if (item.classes && Array.isArray(item.classes)) {
        item.classes.forEach(cls => {
          synergyActive.Synergy[cls] = (synergyActive.Synergy[cls] || 0) + 1;

        });
      }

      // Count origins
      if (item.origins && Array.isArray(item.origins)) {
        item.origins.forEach(origin => {
          synergyActive.Synergy[origin] = (synergyActive.Synergy[origin] || 0) + 1;

        });
      }
    });
    if (synergyActive.Synergy[headliner] !== undefined) {
      synergyActive.Synergy[headliner]++;
    } else if (synergyActive.Synergy[headliner] !== undefined) {
      synergyActive.Synergy[headliner]++;
    }
    synergyActive.headliner = headliner;
    synergyActive.TeamCompId = type;



    this.SynergyActiveList2.push(synergyActive);

    return synergyActive;
  }
  SortTraitByStyle2(synergyActive: SynergyActive) {
    let styleOfTraits: StyleOfTrait[] = [];

    const classesArray = Object.entries(synergyActive.Synergy);
    classesArray.forEach(([key, value]) => {
      var trait = this.TraitList.find(x => x.id === key);
      if (trait != undefined) {
        for (let i = 0; i < trait.effects.length; i++) {
          if (trait.effects[i].minUnits <= value && value <= trait.effects[i].maxUnits) {
            if (synergyActive.headliner === key) {
              styleOfTraits.push({ name: key, style: trait.effects[i].style, headliner: synergyActive.headliner, numberActive: value });
            }
            else {
              styleOfTraits.push({ name: key, style: trait.effects[i].style, headliner: "", numberActive: value });
            }
          }
          else {
            var exist = false;
            for (let i = 0; i < styleOfTraits.length; i++) {
              if (styleOfTraits[i].name == key || styleOfTraits[i].name == key && key == styleOfTraits[i].headliner) {
                exist = true;
              }
            }
            if (exist == false) {
              styleOfTraits.push({ name: key, style: 0, headliner: "", numberActive: value });
            }

          }
        }

      }
    });
    styleOfTraits = this.UniqueStyle(styleOfTraits);

    styleOfTraits.sort((a, b) => (a.style < b.style) ? 1 : -1);

    return styleOfTraits;


  }
  UniqueStyle(style: StyleOfTrait[]) {
    const uniqueStyle: StyleOfTrait[] = [];
    const uniqueNames: string[] = [];

    style.forEach((trait) => {
      if (!uniqueNames.includes(trait.name)) {
        uniqueNames.push(trait.name);
        uniqueStyle.push(trait);
      } else {
        const existingTrait = uniqueStyle.find((t) => t.name === trait.name);
        if (existingTrait) {
          if (trait.style !== 0) {
            existingTrait.style = trait.style;
          }
          if (trait.headliner !== "") {
            existingTrait.headliner = trait.headliner;
          }
        }
      }
    });

    return uniqueStyle;
  }


  getStylePerTrait(style: number) {
    if (style == 1) {
      return "filter: brightness(0) saturate(100%) invert(70%) sepia(87%) saturate(348%) hue-rotate(317deg) brightness(90%) contrast(85%);";
    }
    if (style == 2) {
      return "filter: brightness(0) saturate(100%) invert(91%) sepia(0%) saturate(0%) hue-rotate(139deg) brightness(93%) contrast(87%);";
    }
    if (style == 3 || style == 4) {
      return "filter: brightness(0) saturate(100%) invert(83%) sepia(32%) saturate(7038%) hue-rotate(3deg) brightness(96%) contrast(93%);";
    }
    return "";
  }
  GetStyleTextPerTrait(style: number) {
    if (style == 1) {
      return "color: #d7977b;";
    }
    if (style == 2) {
      return "color: #cccaca;";
    }
    if (style == 3 || style == 4) {
      return "color: #e5a109;";
    }
    return "";
  }

  CheckPositionOfForm(line: number, position: number, type: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[type].map.length; i++) {
        if (teamcomp.fomation[type].map[i].pos.x == position + 1 && teamcomp.fomation[type].map[i].pos.y == line) {
          return true;
        }

      }
    }
    return false
  }
  GetChampionIconByForm(position: number, line: number, type: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[type].map.length; i++) {
        if (teamcomp.fomation[type].map[i].pos.x == position + 1 && teamcomp.fomation[type].map[i].pos.y == line) {
          let name = teamcomp.fomation[type].map[i].data.champion_id.toLocaleLowerCase().replace("tft10_", "");
          return "../../../assets/Champion/icon/" + name.replaceAll(" ","") + ".webp";
        }
      }

    }
    return "";
  }
  GetStyleByForm(position: number, line: number, type: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[type].map.length; i++) {
        if (teamcomp.fomation[type].map[i].pos.x == position + 1 && teamcomp.fomation[type].map[i].pos.y == line) {
          let name = teamcomp.fomation[type].map[i].data.champion_id;
          let Style = this.getBorderSet(name).replace("2px solid ", "");
          if (teamcomp.fomation[type].map[i].data.headliner != "") {
            return "url(#headlinerSynergyGradient)"
          }
          return Style;
        }
      }

    }
    return "";
  }
  GetItemByIdByForm(position: number, line: number, itemPlace: number, type: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[type].map.length; i++) {
        if (teamcomp.fomation[type].map[i].pos.x == position + 1 && teamcomp.fomation[type].map[i].pos.y == line) {

          let itemName = teamcomp.fomation[type].map[i].data.item[itemPlace];
          if (itemName == "" || itemName == undefined || itemName == null) {
            return '';
          }

          let name = itemName.replaceAll(" ", "-").replaceAll("'", "").toLowerCase();

          return "../../../assets/Item/Combined Items/" + name + ".png";
        }
      }
    }
    return '';

  }
  GetCompTips() {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.additional_comp_tips.length; i++) {
        return teamcomp.additional_comp_tips[i].tip + "\n";
      }

    }
    return '';
  }
  GetTipPerForm(type: number) {
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      if (type == 0) {
        if (type == 0) {
          return teamcomp.plan_note[0].note!.join("\n");
        }
      }
      if (type == 1) {
        return teamcomp.plan_note[1].note!.join("\n");
      }
    }
    return '';
  }

  GetAugments(tier: number) {
    let augumentA: string[] = [];
    var id = Number(this.id);
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.meta_content.augument_suggestion[tier].augument_selected.length; i++) {
        augumentA.push(teamcomp.meta_content.augument_suggestion[tier].augument_selected[i]);
      }
    }
    return augumentA;
  }
  GetAugument(name: string, level: number) {
    let augument = this.AugumentList.find(x => x.name === name);
    if (augument != undefined) {
      if (level == 1) {
        return "../../../assets/augument/silver/" + augument.icon + ".webp";
      }
      if (level == 2) {
        return "../../../assets/augument/gold/" + augument.icon + ".webp";
      }
      if (level == 3) {
        return "../../../assets/augument/platinum/" + augument.icon + ".webp";
      }
    }
    return "";
    ;
  }
  ChampionTakeItem: ChampionTakeItem[] = [];
  GetChampionHaveItemFormLate() {
    var id = Number(this.id);
    let c: ChampionTakeItem[] = [];
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].data.item.length > 0) {
          c.push({ ChampionId: teamcomp.fomation[2].map[i].data.champion_id, item: teamcomp.fomation[2].map[i].data.item });
        }
      }
    }
    this.ChampionTakeItem = c;

    return this.ChampionTakeItem;
  }
  GetChampionByChampionId(championId: string) {
    let name = championId.replace("TFT10_", "").toLocaleLowerCase();
    return "../../../assets/Champion/icon/" + name + ".webp";
  }
  getItem(item: string) {
    let name = item.replaceAll(" ", "-").replaceAll("'", "").toLowerCase();
    return "../../../assets/Item/Combined Items/" + name + ".png";
  }
  GetNumberEffect(item: string) {
    var itemFind = this.ItemList.find(x => x.name == item);
    if (itemFind != undefined) {
      const numEffects = Object.keys(itemFind.effects).length;
      return numEffects;
    }
    return 0;
  }
  GetType(item: string, index: number) {
    var itemFind = this.ItemList.find(x => x.name == item);
    var key = ""
    if (itemFind != undefined) {
      const keys = Object.keys(itemFind.effects);
      if (index >= 0 && index < keys.length) {

        key = keys[index];
      }
    }
    console.log(item,key);
    if (key == "AD") {
      return "../../../assets/Item/Stat/attack-damage.svg";
    }
    if(key=="AP"){
      return "../../../assets/Item/Stat/ability-power.svg";
    }
    if(key=="Armor"){
      return "../../../assets/Item/Stat/armor.svg";
    }
    if(key=="MagicResist"){
      return "../../../assets/Item/Stat/magic-resist.svg";
    }
    if(key=="Health"){
      return "../../../assets/Item/Stat/health.svg";
    }
    if(key=="Mana"){
      return "../../../assets/Item/Stat/mana.svg";
    }
    if(key=="AS"){
      return "../../../assets/Item/Stat/attack-speed.svg";
    }
    if(key=="CritChance"){
      return "../../../assets/Item/Stat/crit-chance.svg";
    }
    return "";
  }
  GetStyleByType(item: string, index: number){
    var itemFind = this.ItemList.find(x => x.name == item);
    var key = ""
    if (itemFind != undefined) {
      const keys = Object.keys(itemFind.effects);
      if (index >= 0 && index < keys.length) {

        key = keys[index];
      }
    }
    console.log(item,key);
    if (key == "AD") {
      return "filter: brightness(0%) invert(50%) sepia(60%) saturate(413%) hue-rotate(344deg) brightness(95%) contrast(86%);";
    }
    if(key=="AP"){
      return "filter: brightness(0%) invert(88%) sepia(38%) saturate(375%) hue-rotate(105deg) brightness(101%) contrast(104%);";
    }
    if(key=="Armor"){
      return "filter: brightness(0%) invert(63%) sepia(44%) saturate(4555%) hue-rotate(326deg) brightness(101%) contrast(89%);";
    }
    if(key=="MagicResist"){
      return "filter: brightness(0%) invert(98%) sepia(37%) saturate(5874%) hue-rotate(249deg) brightness(88%);";
    }
    if(key=="Health"){
      return "filter: brightness(0%) invert(37%) sepia(64%) saturate(2874%) hue-rotate(131deg) brightness(94%) contrast(75%);";
    }
    if(key=="Mana"){
      return "filter: brightness(0%) invert(64%) sepia(93%) saturate(1615%) hue-rotate(158deg) brightness(99%) contrast(93%);";
    }
    if(key=="AS"){
      return "filter: brightness(0%) invert(93%) sepia(71%) saturate(7093%) hue-rotate(317deg) brightness(101%) contrast(91%);";
    }
    if(key=="CritChance"){
      return "filter: brightness(0%) invert(59%) sepia(35%) saturate(3081%) hue-rotate(323deg) brightness(108%) contrast(105%);";
    }
    return "";
  }
  GetInfoOfType(item: string, index: number){
    var itemFind = this.ItemList.find(x => x.name == item);
    var value = "";
    if (itemFind != undefined) {
      const values = Object.values(itemFind.effects);
      if (index >= 0 && index < values.length) {
      value = values[index];
      }
    }
    return value;
  }
  GetComponent(item: string, index: number){
    var itemFind = this.ItemList.find(x => x.name == item);
    var value = "";
    if (itemFind != undefined) {
      const values=Object.values(itemFind.components);
      if (index >= 0 && index < values.length) {
        value = values[index];
        }
    }
    return "../../../assets/Item/basic-item/"+value.replace("TFT_Item_","").toLowerCase()+".png";
  }
}
