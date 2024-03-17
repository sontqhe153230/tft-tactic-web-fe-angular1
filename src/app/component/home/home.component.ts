import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AugumentServiceService } from '../../../Service/Augument/augument-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ChampionServiceService } from '../../../Service/Champion/champion-service.service';
import { Champion } from '../../../models/champion';
import { TraitServiceService } from '../../../Service/Trait/trait-service.service';
import { TeamComp } from '../../../models/teamcomp';
import { TeamCompServiceService } from '../../../Service/TeamComp/team-comp-service.service';
import { Observable, map } from 'rxjs';
import { Int32 } from 'mongodb';
import { ItemServiceService } from '../../../Service/Item/item-service.service';
import { Item } from '../../../models/item';
import { SynergyActive } from '../../../models/SynergyActive';
import { Trait } from '../../../models/trait';
import { StyleOfTrait } from '../../../models/StyleOfTrait';
import { Augument } from '../../../models/augument';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, public augumentService: AugumentServiceService,private router: Router) { }
  synergies: string[] = [];
  suggestions: Champion[] = []; // Assuming you have suggestions array in your component
  userValue: string = '';
  TraitName: string[] = [];
  TeamComp: TeamComp[] = [];
  item: Item[] = [];
  TraitList: Trait[] = [];
  AugumentList: Augument[] = [];

  ngOnInit() {
    this.championService.getChampion().subscribe(data => {
      this.suggestions = data;

    });
    this.traitService.getTraitName().subscribe(data => {
      this.TraitName = data;
     
    });
    this.teamcompService.getTeamComp().subscribe(data => {
      this.TeamComp = data;
     console.log(data);
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

  searchInputKeyUp(event: any): void {
    let userData = event.target.value;
    let searchWrapper = document.querySelector('.search-input') as HTMLElement;
    let suggBox = searchWrapper?.querySelector('.autocom-box') as HTMLElement;
    let emptyArray: string[] = [];
    if (userData && suggBox) {
      let Array: Champion[];
      Array = this.suggestions.filter((data: Champion) => {
        return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      emptyArray = Array.map((data: Champion) => {
        let url = this.GetIconUrl(data.id);
        return '<li>'
          + '<div class=row>'
          + '<div class=icon-champ>'
          + '<span>'
          + '<img src=' + url + '>'
          + '</span>'
          + '</div>'
          + '<div class="champ-name">'
          + '<span>' + data.name + '</span>'
          + '</div>'
          + '</div>'
          + '</li>';
      });
      this.showSuggestions(emptyArray, suggBox);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
        allList[i].addEventListener("click", () => this.select(allList[i]));

      }
    } else {
      if (searchWrapper) {
        searchWrapper.classList.remove("active");
      }
    }
  }

  select(element: HTMLElement): void {
    let selectUserData = element.textContent;
    let inputBox = document.querySelector('.search-input input') as HTMLInputElement;
    if (inputBox) {
      inputBox.value = selectUserData || '';
    }
    let searchWrapper = document.querySelector('.search-input') as HTMLElement;
    if (searchWrapper) {
      searchWrapper.classList.remove("active");
    }
  }

  showSuggestions(list: string[], suggBox: HTMLElement): void {
    let listData;
    if (!list.length) {
      if (suggBox instanceof HTMLInputElement) {
        this.userValue = suggBox.value;
      } else {
        this.userValue = ''; // Handle the situation where suggBox is not an HTMLInputElement
      }
      listData = '<li>' + this.userValue + '</li>';
    }
    else {
      listData = list.join('');
    }
    if (suggBox) {
      suggBox.innerHTML = listData;
      let searchWrapper = document.querySelector('.search-input') as HTMLElement;
      if (searchWrapper) {
        searchWrapper.classList.add("active");
      }
    }
  }
  loadOptions() {
    if (this.dropdownOpen == false) {
      this.synergies = this.TraitName;
      this.dropdownOpen = true;
    }
    else {
      this.dropdownOpen = false;
    }
  }
  toggleDropdown() {
    this.dropdownOpen = false;
  }
  dropdownOpen: boolean = false; // Flag to control dropdown state
  selectedSynergy: string | null = null; // Store selected synergy

  selectOption(option: string) {
    this.selectedSynergy = option;
    this.dropdownOpen = false; // Close dropdown after selection
  }

  GetIconUrl(name: string) {
    let Name = "";
    Name = name.replace("TFT10_", "").toLowerCase();
    if (Name == "akali_truedamage") {
      return "../../../assets/Champion/icon/akali-true-damage.webp";
    }
    return "../../../assets/Champion/icon/" + Name + ".webp";
  }
  GetUrlBySynergySelected() {
    if (this.selectedSynergy == "null" || this.selectedSynergy == undefined || this.selectedSynergy == "Any synergy") {
      return "../../../assets/icon/16-any-faded.svg";
    }
    else if (this.selectedSynergy == "True Damage") {
      return "../../../assets/traits/24-true-damage.svg";
    }
    else if (this.selectedSynergy == "Big Shot") {
      return "../../../assets/traits/24-big-shot.svg";
    }
    else if (this.selectedSynergy == "Crowd Diver") {
      return "../../../assets/traits/24-crowd-diver.svg";
    }
    else if (this.selectedSynergy == "K/DA") {
      return "../../../assets/traits/24-kda.svg";
    }
    else {
      let synergy = this.selectedSynergy?.toLowerCase();
      return "../../../assets/traits/24-" + synergy + ".svg";
    }
  }

  GetUrlOfChampionIcon(championId: String) {
    let name = championId.toLocaleLowerCase().replace("tft10_", "");
    return "../../../assets/Champion/icon/" + name + ".webp";
  }
  GetNameByChampionId(championId: String) {
    let name = championId.replace("TFT10_", "");
    return name
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
  GetItemById(itemId: string) {
    let name = itemId.toLocaleLowerCase().replaceAll(" ", "-").replaceAll("'", "");
    return "../../../assets/Item/Combined Items/" + name + ".png";
  }
  getBackgroundImageUrl(id: number) {
    for (let i = 0; i < this.TeamComp.length; i++) {
      if (this.TeamComp[i].idComp === id) {
        for (let j = 0; j < this.TeamComp[i].fomation[2].map.length; j++) {
          let name = this.TeamComp[i].fomation[2].map[0].data.champion_id.toLocaleLowerCase().replace("tft10_", "");
          let url = "../../../assets/Champion/background/" + name + ".webp";

          return "background-image: url(" + url + ")";
        }
      }
     
    }
    return "";
  }
  GetColorByLevel(level: string) {
   //#e54787
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
  getBackgroundImageLargerUrl(id: number) {
    for (let i = 0; i < this.TeamComp.length; i++) {
      if (this.TeamComp[i].idComp === id) {
        for (let j = 0; j < this.TeamComp[i].fomation[2].map.length; j++) {
          let name = this.TeamComp[i].fomation[2].map[0].data.champion_id.toLocaleLowerCase().replace("tft10_", "");
          let url = "../../../assets/Champion/background2/" + name + ".webp";

          return "background-image: url(" + url + ")";
        }
      }
     
    }
    return "";
  }




  SynergyActiveList: SynergyActive[] = [];

  processedIds: Set<number> = new Set<number>();
  // Remove the subscription from getSynergy method
  style: StyleOfTrait[] = [];
  getSynergy(id: number): StyleOfTrait[] {
    // Check if the id has been processed already
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
      this.teamcompService.getChampionByTeamCompId(id,"late").subscribe(data => {
        ChampionList = data;
        let SynergyActiveList: SynergyActive;
        SynergyActiveList = this.countDuplicates(ChampionList, headliner, id);


      });
      // Add the id to the set of processed ids
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




  // Function to count duplicate classes and origins
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
  getTraitByHeadliner(headliner: string) {
    let name = headliner.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }
  GetTraitByName(set: string) {
    let name = set.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
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
  CheckPosition(id: number, line: number, position: number) {
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
  GetChampionIcon(id: number, position: number, line: number) {
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].pos.x == position + 1 && teamcomp.fomation[2].map[i].pos.y == line) {
          let name = teamcomp.fomation[2].map[i].data.champion_id.toLocaleLowerCase().replace("tft10_", "");
          return "../../../assets/Champion/icon/" + name + ".webp";
        }
      }

    }
    return "";
  }
  GetStyle(id: number, position: number, line: number) {
    var teamcomp = this.TeamComp.find(x => x.idComp === id);
    if (teamcomp != undefined) {
      for (let i = 0; i < teamcomp.fomation[2].map.length; i++) {
        if (teamcomp.fomation[2].map[i].pos.x == position + 1 && teamcomp.fomation[2].map[i].pos.y == line) {
          let name = teamcomp.fomation[2].map[i].data.champion_id;
          let Style = this.getBorderSet(name).replace("2px solid ", "");
          if (teamcomp.fomation[2].map[i].data.headliner != "") {
            return "url(#headlinerSynergyGradient"+id+")"
          }
          return Style;
        }
      }

    }
    return "";
  }
  GetUrlClipPath(id:number){
    return "url(#myMask"+id+")";
  }
  SeeMore: boolean[] = [];
  loadSeeMore(item:number) {
   this.SeeMore[item] = !this.SeeMore[item];
  }
  redirectToRoute(id: number) {
    this.router.navigate(['/Guide',id]);
  }
  GetIconTraitByHeadliner(headliner: string) {
    let name = headliner.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }
}
