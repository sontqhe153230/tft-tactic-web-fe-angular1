import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AugumentServiceService {

  constructor(private http:HttpClient) { }

  getAugument(){
    return this.http.get<any[]>('https://localhost:7283/api/Augument');
  }
}
