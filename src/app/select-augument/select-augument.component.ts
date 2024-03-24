import { ChangeDetectorRef, Component } from '@angular/core';
import { AugumentServiceService } from '../../Service/Augument/augument-service.service';
import { ChampionServiceService } from '../../Service/Champion/champion-service.service';
import { TraitServiceService } from '../../Service/Trait/trait-service.service';
import { ItemServiceService } from '../../Service/Item/item-service.service';
import { TeamCompServiceService } from '../../Service/TeamComp/team-comp-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Augument } from '../../models/augument';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AugumentSuggestion, TeamComp } from '../../models/teamcomp';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-select-augument',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './select-augument.component.html',
  styleUrl: './select-augument.component.css'
})
export class SelectAugumentComponent {
  constructor(private cdr: ChangeDetectorRef, public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, public augumentService: AugumentServiceService, private router: Router, private route2: ActivatedRoute) { }
  AugumentList: Augument[] = [];
  AugumentListByTier: Augument[] = []
  IsOpen: boolean = false;
  Tier: number = 0;
  AugumentSuggestion: AugumentSuggestion[] = []
  ngOnInit() {
    this.augumentService.getAugument().subscribe(data => {
      this.AugumentList = data;

    });
  }

  SelectAugumentByTier(tier: number) {
    this.Tier = tier;
    console.log(this.Tier);
    this.AugumentListByTier = this.AugumentList.filter(a => a.level == tier);
    console.log(this.AugumentListByTier);
    return this.AugumentListByTier;

  }
  OpenSelection() {
    if (this.IsOpen) {
      return this.IsOpen = false
    }
    return this.IsOpen = true
  }
  OpenSelectAugument() {
    if (this.IsOpen) {
      return "display:block;"
    }
    else {
      return "display:none;"
    }
  }
  GetUrlAugument(name: string, level: number) {
    if (level == 1) {
      return "../../../assets/augument/silver/" + name + ".webp"
    }
    if (level == 2) {
      return "../../../assets/augument/gold/" + name + ".webp"
    }
    if (level == 3) {
      return "../../../assets/augument/platinum/" + name + ".webp"
    }
    return "";
  }

  AugumentSuggestiontier1: AugumentSuggestion = {
    tier: 0,
    augument_selected: []
  };
  AugumentSuggestiontier2: AugumentSuggestion = {
    tier: 0,
    augument_selected: []
  };
  AugumentSuggestiontier3: AugumentSuggestion = {
    tier: 0,
    augument_selected: []
  };
  SelectAugument(name: string, tier: number) {
    let targetTier;
    switch (tier) {
      case 1:
        targetTier = this.AugumentSuggestiontier1;
        break;
      case 2:
        targetTier = this.AugumentSuggestiontier2;
        break;
      case 3:
        targetTier = this.AugumentSuggestiontier3;
        break;
      default:
       
        return;
    }
  
    const index = targetTier.augument_selected.findIndex(f => f === name);
  
    if (index !== -1) {
      
      targetTier.augument_selected.splice(index, 1);
      
    } else {
      if (targetTier.augument_selected.length < 3) {
        targetTier.tier = tier; 
        targetTier.augument_selected.push(name);
       
      }
    }
  
   
    console.log(targetTier);
  }
  
  ChangeStyleWhenSelect(name: string, tier: number) {
    
      let targetTier;
      switch (tier) {
        case 1:
          targetTier = this.AugumentSuggestiontier1;
          break;
        case 2:
          targetTier = this.AugumentSuggestiontier2;
          break;
        case 3:
          targetTier = this.AugumentSuggestiontier3;
          break;
        default:
         
          return;
      }
    
      const index = targetTier.augument_selected.findIndex(f => f === name);
      if(index!==-1){
        return "border-color: #1dc49b; background: #2c274f;"
       
      }
       else{
        if(tier==1){
          return "border-color: #cccaca; background: #2c274f;"
        }
       if(tier==2){
        return "border-color: #f3cf5a; background: #2c274f;"
       }
       if(tier==3){
        return "border-image: conic-gradient(from 180deg at 50% 50%, rgb(181, 249, 177) -25.61deg, rgb(174, 167, 248) 0.63deg, rgb(185, 232, 188) 27.2deg, rgb(246, 254, 216) 56.21deg, rgb(199, 251, 247) 83.01deg, rgb(154, 240, 254) 109.35deg, rgb(245, 236, 255) 129.56deg, rgb(248, 153, 248) 154.85deg, rgb(182, 252, 227) 181.24deg, rgb(126, 147, 242) 210.86deg, rgb(225, 164, 253) 244.3deg, rgb(175, 230, 240) 264.6deg, rgb(243, 241, 199) 287.41deg, rgb(233, 159, 126) 306.52deg, rgb(181, 249, 177) 334.39deg, rgb(174, 167, 248) 360.63deg) 1 / 1 / 0 stretch; background: #2c274f;"
       }
       return "";
       }
    
   
  }

  GetAugumentTier(name:string,tier:number){
    let augumentFind:Augument|undefined;
    augumentFind =this.AugumentList.find(a=>a.name==name);
    if(augumentFind!=undefined){
      if (tier == 1) {
        return "../../../assets/augument/silver/" + augumentFind.icon + ".webp"
      }
      if (tier == 2) {
        return "../../../assets/augument/gold/" + augumentFind.icon + ".webp"
      }
      if (tier == 3) {
        return "../../../assets/augument/platinum/" + augumentFind.icon + ".webp"
      }
    }
    return "";
  }
  DeleteAllSelection(tier:number){
    if (tier == 1) {
      return this.AugumentSuggestiontier1.augument_selected=[]
    }
    if (tier == 2) {
      return this.AugumentSuggestiontier2.augument_selected=[]
    }
    if (tier == 3) {
      return this.AugumentSuggestiontier3.augument_selected=[]
    }
    return null;
  }
  newTeamComp: TeamComp |undefined
  SaveData(){
    if(this.AugumentSuggestiontier1.augument_selected.length<=0 || this.AugumentSuggestiontier2.augument_selected.length<=0 || this.AugumentSuggestiontier3.augument_selected.length<=0){
      Swal.fire({
        title: 'Error!',
        text: 'Please select 1 to 3 in each tier',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
   else{
    let augument_selected:AugumentSuggestion[]=[]
    augument_selected.push(this.AugumentSuggestiontier1);
    augument_selected.push(this.AugumentSuggestiontier2);
    augument_selected.push(this.AugumentSuggestiontier3);

    this.newTeamComp = this.teamcompService.getNewTeamComp();

    this.newTeamComp.meta_content.augument_suggestion=augument_selected;
    
    this.teamcompService.setNewTeamComp(this.newTeamComp)
          
    if(this.newTeamComp!=undefined){
      this.newTeamComp.fomation.sort((a,b)=>{
        const planOrder = { "early": 0, "mid": 1, "late": 2 } as const;
        return planOrder[a.plan as keyof typeof planOrder] - planOrder[b.plan as keyof typeof planOrder];

      })
      console.log(this.newTeamComp);
     
      this.teamcompService.CreateTeamComp(this.newTeamComp);
    }
    Swal.fire({
      title: 'Success!',
      text: 'Add TeamComp Success',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    //  this.router.navigate(['/Home']).then(() => {
    //   window.location.reload();
    // });

   }
  }
}
