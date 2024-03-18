import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http:HttpClient) { }

  getItem(){
    return this.http.get<any[]>('https://tft-tatctic-app-7d0316a41128.herokuapp.com/api/Item');
  }
}
