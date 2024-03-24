import { Component } from '@angular/core';
import { AugumentServiceService } from '../../Service/Augument/augument-service.service';
import { ChampionServiceService } from '../../Service/Champion/champion-service.service';
import { TraitServiceService } from '../../Service/Trait/trait-service.service';
import { TeamCompServiceService } from '../../Service/TeamComp/team-comp-service.service';
import { ItemServiceService } from '../../Service/Item/item-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Augument } from '../../models/augument';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auguments',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './auguments.component.html',
  styleUrl: './auguments.component.css'
})
export class AugumentsComponent {
  AugumentList: Augument[] = [];
  Tier: number = 0
  constructor(public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, private router: Router, private route2: ActivatedRoute) { }
  ngOnInit() {
    this.augeumentService.getAugument().subscribe(data => {
      this.AugumentList = data;
    });
  }
  getAugumentList() :Augument[]{
    let AugumentbyTier:Augument[]=[];
    if (this.Tier == 0) {
       AugumentbyTier=this.AugumentList.filter(a=>a.level==1);
    }
    else{
      AugumentbyTier=this.AugumentList.filter(a=>a.level==this.Tier);
    }
    return AugumentbyTier
  }
  GetUrlAugument(name:string,level:number){
    if(level==1){
      return "../../../assets/augument/silver/" + name + ".webp"
    }
    if(level==2){
      return "../../../assets/augument/gold/" + name + ".webp"
    }
    if(level==3){
      return "../../../assets/augument/platinum/" + name + ".webp"
    }
    return "";
  }
  selectLecel(level:number){
    return this.Tier=level;
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
}
