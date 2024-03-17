import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Int32 } from 'mongodb';
import { Champion } from '../../models/champion';
import { TeamComp } from '../../models/teamcomp';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamCompServiceService {

  sharedData: TeamComp = { 
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
  }; ;
 
  setNewTeamComp(teamComp: TeamComp) {
    this.sharedData = teamComp;
  }

  getNewTeamComp(): TeamComp  {
    return this.sharedData;
  }
  private apiUrl = 'https://localhost:7283/api/TeamComp';
  constructor(private http:HttpClient) {

   
   }
  getTeamComp(){
    return this.http.get<any[]>('https://localhost:7283/api/TeamComp');
  }
  getTeamCompById(id:number){
    return this.http.get<TeamComp>('https://localhost:7283/api/TeamComp/'+id);
  }
  getChampionByTeamCompId(id:number,plan:string){
    return this.http.get<Champion[]>('https://localhost:7283/api/TeamComp/champion/'+id+'/'+plan);
  }

  getHeadlinerByTeamCompId(id:number){
    return this.http.get<string>('https://localhost:7283/api/TeamComp/headliner/'+id);
  }
  CreateTeamComp(TeamComp:TeamComp) {
    const url = 'https://localhost:7283/api/TeamComp';
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    });

     this.http.post(url, TeamComp, { headers, responseType: 'text' }).subscribe((res)=>{
      console.log(res);
    })
   
  }
 
}
