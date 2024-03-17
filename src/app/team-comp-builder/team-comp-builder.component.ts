import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgIterable, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AugumentServiceService } from '../../Service/Augument/augument-service.service';
import { ChampionServiceService } from '../../Service/Champion/champion-service.service';
import { TraitServiceService } from '../../Service/Trait/trait-service.service';
import { TeamCompServiceService } from '../../Service/TeamComp/team-comp-service.service';
import { ItemServiceService } from '../../Service/Item/item-service.service';
import { Champion } from '../../models/champion';
import { Formation, MyMap, TeamComp } from '../../models/teamcomp';
import { Item } from '../../models/item';
import { Trait } from '../../models/trait';
import { Augument } from '../../models/augument';
import { ChampionTakeItem } from '../../models/ChampionTakeItem';
import { TeamCompBuider } from '../../models/TeamCompBuider';
import { SynergyActive } from '../../models/SynergyActive';
import { StyleOfTrait } from '../../models/StyleOfTrait';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-team-comp-builder',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './team-comp-builder.component.html',
  styleUrl: './team-comp-builder.component.css',
})
export class TeamCompBuilderComponent {
  constructor(private cdr: ChangeDetectorRef, public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, public augumentService: AugumentServiceService, private router: Router,private route2: ActivatedRoute) { }
  plan: string = "";
  synergies: string[] = [];
  ChampionList: Champion[] = []; 
  userValue: string = '';
  TraitName: string[] = [];
  TeamComp: TeamComp[] = [];
  item: Item[] = [];
  TraitList: Trait[] = [];
  AugumentList: Augument[] = [];
  ngAfterContentChecked() {

    this.cdr.detectChanges();

  }
  ngOnInit() {
    this.route2.params.subscribe(params => {
      this.plan = params['plan'];

    });
    this.championService.getChampion().subscribe(data => {
      this.ChampionList = data;

    });
    this.traitService.getTraitName().subscribe(data => {
      this.TraitName = data;

    });
    this.teamcompService.getTeamComp().subscribe(data => {
      this.TeamComp = data;

    });
    this.itemService.getItem().subscribe(data => {
      this.item = data;

    });
    this.traitService.getTrait().subscribe(data => {
      this.TraitList = data;

    });
    this.augumentService.getAugument().subscribe(data => {
      this.AugumentList = data;

    });
  }
  type: number = 1;
  GetCombineItem() {
    var itemList = this.item.filter(x => x.components != null);
    return itemList;
  }
  GetUrlbyName(name: string, type: number) {
    if (type == 1) {
      let championName = name.replace(' ', '').toLowerCase();
      if (name == "akali_truedamage") {
        return "../../../assets/Champion/icon/akali-true-damage.webp";
      }
      return "../../../assets/Champion/icon/" + championName + ".webp";
    }
    else {
      let Itemname = name.replaceAll(" ", "-").replaceAll("/", "").replaceAll("'", "").toLowerCase();

      return "../../../assets/Item/Combined Items/" + Itemname + ".png";
    }
  }
  GetStylebyName(name: string, type: number) {
    if (type == 1) {
      var five = '3px solid #fe8900';
      var four = '3px solid #f947c6';
      var three = '3px solid #0b6cc3';
      var two = '3px solid #1bc660';
      var one = '3px solid #afafaf';
      var champion = this.ChampionList.find(x => x.name == name);
      if (champion != null || champion != undefined) {
        if (champion.cost == 1) {
          return "border: " + one + ";";
        }
        if (champion.cost == 2) {
          return "border: " + two + ";";
        }
        if (champion.cost == 3) {
          return "border: " + three + ";";
        }
        if (champion.cost == 4) {
          return "border: " + four + ";";
        }
        if (champion.cost == 5) {
          return "border: " + five + ";";
        }
      }
    }
    else {
      return "border:3px solid #f2bf43;"
    }
    return "";

  }
  ItemSelected: string = "";
  PositionSelected: number = 0;
  ItemWhenDrop: TeamCompBuider[] = [];
  onDragStart(item: string) {
    this.ItemSelected = item;

  }
  onDragOver(event: any, position: number) {

    this.PositionSelected
    event.preventDefault();

  }
  onDrop(event: any, position: number) {
    var checkIsItem = this.item.find(x => x.name == this.ItemSelected);
    if (checkIsItem != undefined) {
      var exist = this.ItemWhenDrop.find(x => x.position == position);
      if (exist != undefined) {
        if (exist.ItemTaken.length < 3) {
          exist.ItemTaken.push(this.ItemSelected)
        }
        console.log(this.ItemWhenDrop)
      }
    }
    else {
      var exist = this.ItemWhenDrop.find(x => x.position == position);
      if (exist == undefined) {
        this.ItemWhenDrop.push({ championName: this.ItemSelected, ItemTaken: [], position: position, Headliner: "" });
      }
      else {
        if (this.ItemSelected != exist.championName) {
          exist.championName = this.ItemSelected;
          this.ItemWhenDrop = [...this.ItemWhenDrop]; // trigger change detection
        }
      }
    }


  }

  getUrlWhendrop(index: number) {
    var item = this.ItemWhenDrop.find(x => x.position == index);
    if (item != undefined) {
      let championName = item.championName.replace(' ', '').toLowerCase();
      if (championName == "akali_truedamage") {
        return "../../../assets/Champion/icon/akali-true-damage.webp";
      }
      return "../../../assets/Champion/icon/" + championName + ".webp";
    }
    return "";
  }

  RemoveItem(index: number) {
    var item = this.ItemWhenDrop.find(x => x.position == index);
    if (item != undefined) {
      this.ItemWhenDrop = this.ItemWhenDrop.filter(x => x.position !== index);
      if (this.ItemWhenDrop.length == 0) {
        this.style = [];
      }
    }
  }
  GetStyleWhenDrop(index: number) {
    var item = this.ItemWhenDrop.find(x => x.position == index);
    if (item != undefined) {
      var champion = this.ChampionList.find(x => x.name == item!.championName);

      if (champion != null || champion != undefined) {
        if (item.Headliner != '') {
          return "url(#headlinerSynergyGradient)";
        }
        if (champion.cost == 1) {

          return "#afafaf";
        }
        if (champion.cost == 2) {

          return "#1bc660";
        }
        if (champion.cost == 3) {

          return "#0b6cc3";
        }
        if (champion.cost == 4) {

          return "#f947c6";
        }
        if (champion.cost == 5) {

          return "#fe8900";
        }

      }

    }
    return "#382f66";
  }
  GetTraitByItemSelected(index: number) {
    let traitHave: string[] = [];
    var item = this.ItemWhenDrop.find(x => x.position == index);

    if (item != undefined) {
      var champion = this.ChampionList.find(x => x.name == item!.championName);
      if (champion != null || champion != undefined) {
        champion.classes.forEach(element => {
          traitHave.push(element);
        });
        champion.origins.forEach(element => {
          traitHave.push(element);
        });

        return traitHave;
      }
    }
    return null;
  }
  GetUrlBySet(set: string) {
    let name = set.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }


  toggleClass(index: number, item: string) {
    var check = this.ItemWhenDrop.find(x => x.Headliner != '');
    var checkItem = this.ItemWhenDrop.find(x => x.Headliner == item);
    if (check != undefined) {
      check.Headliner = "";
    }
    if (checkItem !== undefined) {
      checkItem.Headliner = "";
    }
    else {
      var itemClick = this.ItemWhenDrop.find(x => x.position == index);
      if (itemClick != undefined) {
        if (itemClick.Headliner == item) {
          itemClick.Headliner = "";
        }
        else {
          itemClick.Headliner = item;
        }
      }
    }

  }

  GetClassWhenActiveHeadliner(index: number, item: string) {
    var headliner = this.ItemWhenDrop.find(x => x.position == index);
    if (headliner != undefined) {
      if (headliner.Headliner == item) {
        return "cp4-2";
      }
    }
    return "cp4-1";
  }

  SynergyActiveList: SynergyActive[] = [];
  style: StyleOfTrait[] = [];

  GetActiveStyle(item: string) {
    let champion: Champion[] = [];
    this.ItemWhenDrop.forEach(element => {
      const championName = element.championName;
      if (!champion.some(champ => champ.name === championName)) {
        const champ = this.ChampionList.find(x => x.name === championName);
        if (champ) {
          champion.push(champ);
        }
      }
    });

    var check = this.ItemWhenDrop.find(x => x.Headliner != '');
    if (check != undefined) {
      let SynergyActiveList: SynergyActive;
      SynergyActiveList = this.countDuplicates(champion, check?.Headliner, 0);
      this.style = this.SortTraitByStyle(SynergyActiveList);
    }
    else {
      let SynergyActiveList: SynergyActive;
      SynergyActiveList = this.countDuplicates(champion, "", 0);
      this.style = this.SortTraitByStyle(SynergyActiveList);
    }
    var active = this.style.find(x => x.name == item);
    if (active != undefined) {
      if (active.style != 0)
        return "filter: brightness(0) saturate(100%) invert(92%) sepia(58%) saturate(2719%) hue-rotate(318deg) brightness(94%) contrast(102%);";
    }
    return "";
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

  GetNumberActiveTrait(name: string) {
    let num: string[] = [];
    var active = this.TraitList.find(x => x.id == name);
    if (active != undefined) {
      if (active.effects && Array.isArray(active.effects)) {
        active.effects.forEach(effect => {
          if (effect.minUnits) {
            num.push("" + effect.minUnits);
          }
        });
      }
      return num;
    }
    return [];
  }
  GetTraitByName(set: string) {
    let name = set.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }
  GetBackGroundByTrait(style: number) {
    if (style == 1) {
      return "background: #6f4939;";
    }
    if (style == 2) {
      return "background: #858585;";
    }
    if (style == 3 || style == 4) {
      return "background: #a27207;";
    }
    if (style == 5) {
      return "background: conic-gradient(from 180deg at 50% 50%, rgb(181, 249, 177) -25.61deg, rgb(174, 167, 248) 0.63deg, rgb(185, 232, 188) 27.2deg, rgb(246, 254, 216) 56.21deg, rgb(199, 251, 247) 83.01deg, rgb(154, 240, 254) 109.35deg, rgb(245, 236, 255) 129.56deg, rgb(248, 153, 248) 154.85deg, rgb(182, 252, 227) 181.24deg, rgb(126, 147, 242) 210.86deg, rgb(225, 164, 253) 244.3deg, rgb(175, 230, 240) 264.6deg, rgb(243, 241, 199) 287.41deg, rgb(233, 159, 126) 306.52deg, rgb(181, 249, 177) 334.39deg, rgb(174, 167, 248) 360.63deg);";
    }
    return "";
  }
  GetStrokeByTrait(style: number) {
    if (style == 1) {
      return "#d7977b";
    }
    if (style == 2) {
      return "background: #858585;";
    }
    if (style == 3 || style == 4) {
      return "#cccaca";
    }
    if (style == 5) {
      return "#ffffff";
    }
    return "";
  }
  GetBackGroundWhenActive(style: number, headliner: string, name: string) {
    if (style != 0) {
      return "background: #2c274f;box-shadow: rgba(21, 11, 37, 0.5) 0px 4px 10px;";
    }
    if (style == 0 && headliner == name) {
      return "background: #151136;background-image: linear-gradient(var(--general-base-100), var(--general-base-100)), conic-gradient(from -90deg at 50% 50%, #c74de0 0deg, #7157ce 44.21deg, #6fb1ba 85.51deg, #6487f9 120deg, #9978c9 150.76deg, #c74de0 180.42deg, #fcd17c 215.52deg, #67be46 253.12deg, #fcd17c 299.09deg, #82b8d8 326.25deg, #c74de0 360deg);";
    }
    if (style != 0 && headliner == name) {
      return "background: #2c274f;box-shadow: rgba(21, 11, 37, 0.5) 0px 4px 10px;background-image: linear-gradient(var(--general-base-100), var(--general-base-100)), conic-gradient(from -90deg at 50% 50%, #c74de0 0deg, #7157ce 44.21deg, #6fb1ba 85.51deg, #6487f9 120deg, #9978c9 150.76deg, #c74de0 180.42deg, #fcd17c 215.52deg, #67be46 253.12deg, #fcd17c 299.09deg, #82b8d8 326.25deg, #c74de0 360deg);";
    }
    return "background: #151136;";
  }
  GetFilterByActive(style: number) {
    if (style == 0) {
      return "filter: brightness(0) saturate(100%) invert(43%) sepia(10%) saturate(1095%) hue-rotate(206deg) brightness(91%) contrast(84%);";
    }
    if (style != 0) {
      return "filter: brightness(0) saturate(100%) invert(98%) sepia(5%) saturate(1311%) hue-rotate(327deg) brightness(96%) contrast(91%);";
    }

    return "";
  }
  GetClassBaseOnHeadliner(headliner: string, name: string) {
    if (headliner == name) {
      return "s1-2-special";
    }
    return "s1-2";
  }
  option: string = "champion";
  ChangeClassOption() {
    if (this.option == "champion") {
      return "c6s-16";
    }
    else {
      return "c6s-17";
    }
  }
  ChangeOption() {
    if (this.option == "champion") {
      this.type = 2;
     
      return this.option = "item";
    }
    else {
     
      this.type = 1;
      return this.option = "champion";
    }
  }
  GetItemByIndex(index:number){
    let itemTaken:string[]=[]
    var record = this.ItemWhenDrop.find(x => x.position == index);
    if (record != undefined) {
      if (record.ItemTaken.length>0) {
        itemTaken=record.ItemTaken
        return itemTaken;
      }
      
    }
    return [];
  }
  GetItemByName(name:string){
    let item = name.replaceAll(" ", "-").replaceAll("'", "").toLowerCase();
      return "../../../assets/Item/Combined Items/" + item + ".png";
  }
  newTeamComp: TeamComp = { 
    _id: '',
    meta_content: { title: '', info: '', augument_suggestion: [] },
    fomation: [],
    when_to_make: '',
    how_to_play: '',
    additional_comp_tips: [],
    plan_note: [],
    updatedAt: '',
    rate_of_difficul: '',
    playstyle: '',
    idComp: 0
  };
  
  RedirectToGuideDescription(){
    const formation: Formation[] = [];
   
      this.newTeamComp=this.teamcompService.getNewTeamComp();
    
    const maps: MyMap[] = [];
    for (let i = 0; i < this.ItemWhenDrop.length; i++) { 
      if(this.ItemWhenDrop[i].position>=0 && this.ItemWhenDrop[i].position<=6){       
          const map: MyMap = { 
            pos: { x: this.ItemWhenDrop[i].position+1, y: 1 },
            data: { item: this.ItemWhenDrop[i].ItemTaken, champion_id: `TFT10_`+this.ItemWhenDrop[i].championName.trim, champion_star: i + 1, headliner: '' }
          };
          maps.push(map) 
    }
    if(this.ItemWhenDrop[i].position>=7 && this.ItemWhenDrop[i].position<=13){
      

      const map: MyMap = { 
        pos: { x: this.mapNumberLine2(this.ItemWhenDrop[i].position)-1, y: 2 },
        data: { item: [], champion_id: `TFT10_`+this.ItemWhenDrop[i].championName.trim, champion_star:  1, headliner: this.ItemWhenDrop[i].Headliner }
      };
      maps.push(map)
  }
  if(this.ItemWhenDrop[i].position>=14 && this.ItemWhenDrop[i].position<=20){
    const map: MyMap = { 
      pos: { x: this.mapNumberLine3(this.ItemWhenDrop[i].position)+1, y: 3 },
      data: { item: [], champion_id: `TFT10_`+this.ItemWhenDrop[i].championName.trim, champion_star:  1, headliner: this.ItemWhenDrop[i].Headliner }
    };
    maps.push(map)
}
if(this.ItemWhenDrop[i].position>=21 && this.ItemWhenDrop[i].position<=27){
  const map: MyMap = { 
    pos: { x: this.mapNumberLine4(this.ItemWhenDrop[i].position)+1, y: 4 },
    data: { item: [], champion_id: `TFT10_`+this.ItemWhenDrop[i].championName.trim, champion_star:  1, headliner: this.ItemWhenDrop[i].Headliner }
  };
  maps.push(map)
}
  } 
  const formationEntry: Formation = { plan: this.plan, map: maps };
  this.newTeamComp.fomation.push(formationEntry);
  this.teamcompService.setNewTeamComp(this.newTeamComp);
  console.log(this.teamcompService.sharedData,this.ItemWhenDrop);
if(this.plan=="late"){
  Swal.fire({
    title: 'Success!',
    text: ' successfully! At the next step ,please give me guide how your team work',
    icon: 'success',
    confirmButtonText: 'OK'
  });
  this.router.navigate(['/Description']);
}
if(this.plan=="early"){
  Swal.fire({
    title: 'Success!',
    text: ' successfully! At the next step ,please give me plan note at early phase',
    icon: 'success',
    confirmButtonText: 'OK'
  });
  this.router.navigate(['/Note', "early"]);
}
if(this.plan=="mid"){
  Swal.fire({
    title: 'Success!',
    text: ' successfully! At the next step ,please give me formation at mid phase',
    icon: 'success',
    confirmButtonText: 'OK'
  });
  this.router.navigate(['/Note', "mid"]);
}
}

 mapNumberLine4(num: number): number {
  if (num >= 21 && num <= 27) {
    return num - 21;
  } else {
    return -1; 
  }
}
 mapNumberLine2(num: number): number {
  if (num >= 7 && num <= 13) {
    return 15 - num;
  } else {
    return -1; 
  }
}
 mapNumberLine3(num: number): number {
  if (num >= 14 && num <= 20) {
    return num - 14;
  } else {
    return -1; 
  }
}


}
