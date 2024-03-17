import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalServiceService {

  constructor(private http:HttpClient) { }

  getPortal(){
    return this.http.get<any[]>('https://localhost:7283/api/Portal');
  }
}
