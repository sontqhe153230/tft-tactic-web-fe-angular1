import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionServiceService {

  constructor(private http:HttpClient) { }

  getChampion(){
    return this.http.get<any[]>('https://tft-tatctic-app-7d0316a41128.herokuapp.com/api/Champion');
  }
  getChampionName(){
    return this.http.get<any[]>('https://tft-tatctic-app-7d0316a41128.herokuapp.com/api/Champion/name');
  }
  getChampionById(id:string){
    return this.http.get<any>('https://tft-tatctic-app-7d0316a41128.herokuapp.com/api/Champion/GetChampion?id='+id);
  }
}
