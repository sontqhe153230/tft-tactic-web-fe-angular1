import { Component, OnInit } from '@angular/core';
import { Champion, RelativeChampion } from '../../../models/champion';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChampionServiceService } from '../../../Service/Champion/champion-service.service';
import { AugumentServiceService } from '../../../Service/Augument/augument-service.service';
import { TraitServiceService } from '../../../Service/Trait/trait-service.service';
import { TeamCompServiceService } from '../../../Service/TeamComp/team-comp-service.service';
import { ItemServiceService } from '../../../Service/Item/item-service.service';
import { TeamComp } from '../../../models/teamcomp';
import { Item } from '../../../models/item';
import { Trait } from '../../../models/trait';
import { Augument } from '../../../models/augument';
import { LoadedServiceService } from '../../../Service/loaded-service.service';

@Component({
  selector: 'app-champion-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './champion-detail.component.html',
  styleUrl: './champion-detail.component.css'
})
export class ChampionDetailComponent implements OnInit{

  constructor(private loaderService: LoadedServiceService,public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, public augumentService: AugumentServiceService, private router: Router,private route2: ActivatedRoute) { }
  synergies: string[] = [];
  champion: Champion[] = []; 
  championSelected:Champion // Assuming you have suggestions array in your component
  | undefined// Assuming you have suggestions array in your component
  userValue: string = '';
  TraitName: string[] = [];
  TeamComp: TeamComp[] = [];
  item: Item[] = [];
  TraitList: Trait[] = [];
  AugumentList: Augument[] = [];
  RelariveChampion: RelativeChampion[] = [];
  idChampion:String="";
  loading = true;
  ngOnInit() {
   
    this.route2.params.subscribe(params => {
      this.idChampion = params['id'];

    });
    this.championService.getChampion().subscribe(data => {
      this.champion = data;
      this.championSelected=data.find(c=>c.id==this.idChampion);
      this.GetTraitByChamionId(this.championSelected!.id);
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
  imageLoaded = false
  onImageLoad() {
    this.imageLoaded = true; 
    console.log(this.imageLoaded)// Called when the image has finished loading
  }

  ShowDiplayLoader(){
    if(this.imageLoaded){
      console.log(this.imageLoaded)
      return "display:none;"
    } 
    console.log(this.imageLoaded)
    return "display:block;"
  }
  ShowDiplay(){
    if(this.imageLoaded){
      console.log(this.imageLoaded)
      return "display:block;"
    } 
    console.log(this.imageLoaded)
    return "display:none;"
  }
  GetTraitByChamionId(id: string) {
    let championSelected: Champion | undefined;
    let traitStore: string[] = []

    if (this.champion != undefined) {
      championSelected = this.champion.find(x => x.id == id);
      if (championSelected != undefined) {
        for (let i = 0; i < championSelected.classes.length; i++) {
          traitStore.push(championSelected.classes[i])
        }
        for (let i = 0; i < championSelected.origins.length; i++) {
          traitStore.push(championSelected.origins[i])
        }
        traitStore.forEach(element => {
          if (this.filterUnitsByOrigin(element) != undefined) {
            this.RelariveChampion.push(this.filterUnitsByOrigin(element))
          }
        });

      }
    }

  }
  GetDescriptionbyTrait(trait: string){
    if (this.TraitList.find(t => t.id == trait) != undefined) {
      return this.TraitList.find(t => t.id == trait);
    }

    return null;
  }

  filterUnitsByOrigin(origin: string) {
    let championSelected: Champion[] = [];

    championSelected = this.champion.filter(unit => unit.origins.includes(origin));
    if (championSelected.length <= 0) {
      championSelected = this.champion.filter(unit => unit.classes.includes(origin));
    }
    let RelariveChampion: RelativeChampion = { trait: origin, championRelative: championSelected }
    return RelariveChampion;
  }

  getUrlChampion(id: string) {
    let Name = "";
    Name = id.replace("TFT10_", "").toLowerCase();
    if (id == "TFT10_Akali_TrueDamage") {
      return "url(../../../assets/Champion/akali-true-damage.jpg)";
    }
    return "url(../../../assets/Champion/" + Name + ".jpg)";


  }
  getUrlTrails(trails: string) {
    let name = trails.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }
  getRedirect(id: string) {
    return this.router.navigate(['ChampionDetails', id]);
  }
  getBorderSet(set: number) {
    var option;
    var bronze = "1px solid rgb(215, 150, 123)";
    var silver = "1px solid #cccaca";
    var gold = "1px solid #e5a109";
    var chromatic = "1px solid white"

    if (set == 1) {
      option = bronze;
    }
    if (set == 2) {
      option = silver;
    }
    if (set == 3 || set == 4) {
      option = gold;
    }
    if (set == 5) {
      option = chromatic;
    }
    return option;
  }
  getBackgroundSet(set: number) {
    var option;
    var bronze = "#6f4939";
    var silver = "#858585";
    var gold = "#a27207";
    var chromatic = "conic-gradient(from 180deg at 50% 50%, rgb(181, 249, 177) -25.61deg, rgb(174, 167, 248) 0.63deg, rgb(185, 232, 188) 27.2deg, rgb(246, 254, 216) 56.21deg, rgb(199, 251, 247) 83.01deg, rgb(154, 240, 254) 109.35deg, rgb(245, 236, 255) 129.56deg, rgb(248, 153, 248) 154.85deg, rgb(182, 252, 227) 181.24deg, rgb(126, 147, 242) 210.86deg, rgb(225, 164, 253) 244.3deg, rgb(175, 230, 240) 264.6deg, rgb(243, 241, 199) 287.41deg, rgb(233, 159, 126) 306.52deg, rgb(181, 249, 177) 334.39deg, rgb(174, 167, 248) 360.63deg)";
    if (set == 1) {
      option = bronze;
    }
    if (set == 2) {
      option = silver;
    }
    if (set == 3 || set == 4) {
      option = gold;
    }
    if (set == 5) {
      option = chromatic;
    }
    return option;
  }
  GetIconUrl(name: string) {
    let Name = "";
    Name = name.replace("TFT10_", "").toLowerCase();
    if (name == "TFT10_Akali_TrueDamage") {
      return "../../../assets/Champion/icon/akali-truedamage.webp";
    }
    return "../../../assets/Champion/icon/" + Name + ".webp";
  }
  GetRelativeChampion(trait: string) {
    let Relative: RelativeChampion | undefined;
    Relative = this.RelariveChampion.find(x => x.trait == trait);
    if (Relative != undefined) {
      return Relative.championRelative
    } return null
  }

  OnchangePage(id: string) {
    this.router.navigate(['/ChampionDetails', id]);
  }

  getUrlSkill(skill:string,id:string){
    let skillname=skill.replaceAll(" ","-").replaceAll("'","").toLowerCase();
    let name=id.replace("TFT10_","").toLowerCase();
    let imaeName=name+"-"+skillname;
     if(id=="TFT10_Akali_TrueDamage"){
      name="akali-true-damage-"+skillname
      return "../../../assets/Champion/Skill/" + name + ".png";
     }
     if(id=="TFT10_Akali"){
      name="akali-kda-"+skillname
      return "../../../assets/Champion/Skill/" + name + ".png";
     }
     return "../../../assets/Champion/Skill/" + imaeName + ".png";
  }
}
