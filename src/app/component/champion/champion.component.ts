import { Component } from '@angular/core';
import { Champion } from '../../../models/champion';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AugumentServiceService } from '../../../Service/Augument/augument-service.service';
import { ItemServiceService } from '../../../Service/Item/item-service.service';
import { TeamCompServiceService } from '../../../Service/TeamComp/team-comp-service.service';
import { TraitServiceService } from '../../../Service/Trait/trait-service.service';
import { ChampionServiceService } from '../../../Service/Champion/champion-service.service';
import { TeamComp } from '../../../models/teamcomp';
import { Item } from '../../../models/item';
import { Augument } from '../../../models/augument';
import { Trait } from '../../../models/trait';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css'
})
export class ChampionComponent {
  synergies: string[] = [];
  champion: Champion[] = []; // Assuming you have suggestions array in your component
  userValue: string = '';
  TraitName: string[] = [];
  TeamComp: TeamComp[] = [];
  item: Item[] = [];
  TraitList: Trait[] = [];
  AugumentList: Augument[] = [];
  
  constructor(public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, public augumentService: AugumentServiceService,private router: Router){
  }
  ngOnInit() {
    this.championService.getChampion().subscribe(data => {
      this.champion = data;

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

  imageLoaded = false
  onImageLoad() {
    this.imageLoaded = true; 
    // Called when the image has finished loading
  }

  ShowDiplayLoader(){
    if(this.imageLoaded){
      
      return "display:none;"
    } 
   
    return "display:block;"
  }
  ShowDiplay(){
    if(this.imageLoaded){
      
      return "display:block;"
    } 
    
    return "display:none;"
  }

  getUrlChampion(id:string){
    let Name = "";
    Name = id.replace("TFT10_", "").toLowerCase();
    if (id == "TFT10_Akali_TrueDamage") {
      return "url(../../../assets/Champion/akali-true-damage.jpg)";
    }
    return "url(../../../assets/Champion/" + Name + ".jpg)";
    

  }
  getUrlTrails(trails:string){
    let name = trails.replace("Set10_", "").toLowerCase();
    return "../../../assets/traits/24-" + name + ".svg";
  }
  getRedirect(id:string){
   return this.router.navigate(['ChampionDetails',id]);
  }

  
 

}
