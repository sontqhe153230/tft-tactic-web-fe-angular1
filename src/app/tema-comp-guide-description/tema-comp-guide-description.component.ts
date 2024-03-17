import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { AdditionalCompTip, TeamComp } from '../../models/teamcomp';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamCompServiceService } from '../../Service/TeamComp/team-comp-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tema-comp-guide-description',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './tema-comp-guide-description.component.html',
  styleUrl: './tema-comp-guide-description.component.css'
})
export class TemaCompGuideDescriptionComponent {

  constructor( public teamcompService: TeamCompServiceService,  private router: Router, private route2: ActivatedRoute) {

    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
   }


  TeamComp: TeamComp[] = [];
  isDropdownVisible = false;
  DefaultOption="No Playstyle";
  isOptionHardVisible=false;
  isOptionEasyVisible=false;
  isOptionMediumVisible=false;
  DifficultyOption="";
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  HandleSelection(){
    return this.DefaultOption;
  }
  SendSelection(option:string){
   return  this.DefaultOption=option;
  }

 ChangeStyleDifficulty1(){
  let styleDefault="cursor: pointer; opacity: 1; color: #b3b4d0; border-color: #382f66; border-radius: 6px 0px 0px 6px;";
  let styleWhenChange="cursor: pointer; opacity: 1; color: #ffffff; border-color: #f2bf43;";
  if(this.isOptionHardVisible){
    return styleWhenChange;
  }
  else{
    return styleDefault
  }
 }
 ChangeStyleDifficulty2(){
  let styleDefault="cursor: pointer; opacity: 1; color: #b3b4d0; border-color: #382f66; border-radius: 6px 0px 0px 6px;";
  let styleWhenChange="cursor: pointer; opacity: 1; color: #ffffff; border-color: #f2bf43;";
  if(this.isOptionMediumVisible){
    return styleWhenChange;
  }
  else{
    return styleDefault
  }
 }
 ChangeStyleDifficulty3(){
  let styleDefault="cursor: pointer; opacity: 1; color: #b3b4d0; border-color: #382f66; border-radius: 6px 0px 0px 6px;";
  let styleWhenChange="cursor: pointer; opacity: 1; color: #ffffff; border-color: #f2bf43;";
  if(this.isOptionEasyVisible){
    return styleWhenChange;
  }
  else{
    return styleDefault
  }
 }
 SelectionDifficulty(option:string){
  this.DifficultyOption=option;
  
  if(option=="Easy"){
    if(this.isOptionEasyVisible){
      this.isOptionEasyVisible=false
    }
    else{
      this.isOptionEasyVisible=true;
      this.isOptionMediumVisible=false;
      this.isOptionHardVisible=false
    }
    return this.isOptionEasyVisible
  }
  if(option=="Medium"){
    if(this.isOptionMediumVisible){
      this.isOptionMediumVisible=false
    }
    else{
      this.isOptionMediumVisible=true;
      this.isOptionEasyVisible=false;
      this.isOptionHardVisible=false;
    }
    return this.isOptionMediumVisible;
  }
  if(option=="Hard"){
    if(this.isOptionHardVisible){
      this.isOptionHardVisible=false
    }
    else{
      this.isOptionHardVisible=true;
      this.isOptionEasyVisible=false;
      this.isOptionMediumVisible=false;
    }
    return this.isOptionHardVisible;
  }
  return null;
 }
 ChangeDefaultOption(option:string){
  this.DifficultyOption=option
  return this.DifficultyOption;
 }
 InfoTeamComp=new FormGroup({
  CompName: new FormControl(''),
  HowToPlay:new FormControl(''),
  GeneralInfo:new FormControl(''),
  WhenToMake:new FormControl(''),
  AdditionalCompTip:new FormControl('')
 })
 ngOnInit() {
  this.teamcompService.getTeamComp().subscribe(data => {
    this.TeamComp = data;

  });
 }
 newTeamComp: TeamComp |undefined
 todayDate: string;
 SaveData(){
  this.newTeamComp=this.teamcompService.getNewTeamComp();
  let idComp=this.getRandomNumber(0,9999999);
  if(this.TeamComp.find(x=>x.idComp==idComp)){
    idComp=this.getRandomNumber(0,9999999);
  }
  if (this.InfoTeamComp.value.AdditionalCompTip && this.InfoTeamComp.value.CompName && this.InfoTeamComp.value.WhenToMake&&this.InfoTeamComp.value.HowToPlay&&this.InfoTeamComp.value.GeneralInfo) {
    let addData: AdditionalCompTip = { tip: this.InfoTeamComp.value.AdditionalCompTip };
    let additional_comp_tips:AdditionalCompTip[]=[];
    additional_comp_tips.push(addData);
   if(this.newTeamComp!=undefined){
    this.newTeamComp.how_to_play = this.InfoTeamComp.value.HowToPlay;
    this.newTeamComp.when_to_make = this.InfoTeamComp.value.WhenToMake;
    this.newTeamComp.additional_comp_tips=additional_comp_tips;
    this.newTeamComp.meta_content.title=this.InfoTeamComp.value.CompName;
    this.newTeamComp.meta_content.info=this.InfoTeamComp.value.GeneralInfo;
    this.newTeamComp.playstyle=this.DefaultOption;
    this.newTeamComp.rate_of_difficul=this.DifficultyOption;
    this.newTeamComp.idComp=idComp;
    this.newTeamComp.updatedAt=this.todayDate
    this.teamcompService.setNewTeamComp(this.newTeamComp);
    Swal.fire({
      title: 'Success!',
      text: 'Form submitted successfully! At the next step ,please give me formation at early phase',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.router.navigate(['/Build', "early"]);
   }
  }
 else{
  Swal.fire({
    title: 'Error!',
    text: 'Please fill all input',
    icon: 'error',
    confirmButtonText: 'OK'
  });
 }

  console.log(this.InfoTeamComp.value);
 }
  getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

}


