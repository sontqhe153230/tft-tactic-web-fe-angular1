import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionServiceService {

  constructor(private http:HttpClient) { }

  getChampion(){
    return this.http.get<any[]>('https://localhost:7283/api/Champion');
  }
  getChampionName(){
    return this.http.get<any[]>('https://localhost:7283/api/Champion/name');
  }
  getChampionById(id:string){
    return this.http.get<any>('https://localhost:7283/api/Champion/GetChampion?id='+id);
  }
}
