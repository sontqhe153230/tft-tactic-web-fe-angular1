import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraitServiceService {

  constructor(private http:HttpClient) { }

  getTrait(){
    return this.http.get<any[]>('https://tft-tatctic-app-7d0316a41128.herokuapp.com/api/Trait');
  }
  getTraitName(){
    return this.http.get<any[]>('https://tft-tatctic-app-7d0316a41128.herokuapp.com/api/Trait/name');
  }
}
