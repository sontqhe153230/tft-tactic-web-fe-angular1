import { Component } from '@angular/core';
import { Item } from '../../../models/item';
import { AugumentServiceService } from '../../../Service/Augument/augument-service.service';
import { ChampionServiceService } from '../../../Service/Champion/champion-service.service';
import { TraitServiceService } from '../../../Service/Trait/trait-service.service';
import { TeamCompServiceService } from '../../../Service/TeamComp/team-comp-service.service';
import { ItemServiceService } from '../../../Service/Item/item-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  ItemList: Item[] = [];
  ItemId:String="";
  itemListSelected:Item[]=[];
  constructor(public augeumentService: AugumentServiceService, public championService: ChampionServiceService, public traitService: TraitServiceService, public teamcompService: TeamCompServiceService, public itemService: ItemServiceService, private router: Router, private route2: ActivatedRoute) { }

  ngOnInit() {
   
    this.itemService.getItem().subscribe(data => {
      this.ItemList = data;

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


  GetBasicItem(){
    let BasicItem:Item[]=[];
    if(this.ItemList!=undefined){
      BasicItem=this.ItemList.filter(x=>x.isBase==true);
      
      return BasicItem
    }
    return BasicItem
  }
  GetCombinedItem(){
    let Combined:Item[]=[];
    if(this.ItemList!=undefined&& this.ItemId==""){
      Combined=this.ItemList.filter(x=>x.components!=null);
      return Combined
    }
    else{
     return this.itemListSelected;
    }
    
  }

  GetUrlitemByName(name:string,type:String){
    let nameChange=name.replaceAll(".","").replaceAll(" ","").replaceAll("'","").toLowerCase();
    if(type=="basic"){
      return "../../../assets/Item/basic-item/" + nameChange + ".png"
    }
    return "../../../assets/Item/Combined Item/" + nameChange + ".png"
  }

  SelectListItemByBasicItem(id:string){
    let itemCombined=this.ItemList.filter(item =>item.components!=null);
    let itemListSelected=itemCombined.filter(item=>item.components.includes(id))
      this.ItemId=id;
      console.log(itemListSelected);
      return this.itemListSelected=itemListSelected;
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
  GetNumberEffect(item: string) {
    var itemFind = this.ItemList.find(x => x.name == item);
    if (itemFind != undefined) {
      const numEffects = Object.keys(itemFind.effects).length;
      return numEffects;
    }
    return 0;
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

  GetUrlCombineItemImg(name:string){
    let nameChange=name.replaceAll(" ","-").replaceAll("'","").replaceAll("/","").toLowerCase();
    return "../../../assets/Item/Combined Items/" + nameChange + ".png" 
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
