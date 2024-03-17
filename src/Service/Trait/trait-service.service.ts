import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraitServiceService {

  constructor(private http:HttpClient) { }

  getTrait(){
    return this.http.get<any[]>('https://localhost:7283/api/Trait');
  }
  getTraitName(){
    return this.http.get<any[]>('https://localhost:7283/api/Trait/name');
  }
}
