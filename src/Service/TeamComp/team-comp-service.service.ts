import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Int32 } from 'mongodb';
import { Champion } from '../../models/champion';
import { TeamComp } from '../../models/teamcomp';

@Injectable({
  providedIn: 'root'
})
export class TeamCompServiceService {

  sharedData: TeamComp | undefined;

  setNewTeamComp(teamComp: TeamComp) {
    this.sharedData = teamComp;
  }

  getNewTeamComp(): TeamComp | undefined {
    return this.sharedData;
  }
  private apiUrl = 'https://localhost:7283/api/TeamComp';
  constructor(private http:HttpClient) { }
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
  CreateTeamComp(TeamComp:TeamComp){
    return this.http.post<TeamComp>(this.apiUrl + '/CreateTeamComp', TeamComp);
  }
}
