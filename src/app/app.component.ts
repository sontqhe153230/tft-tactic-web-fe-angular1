import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/header/header.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { DOCUMENT } from '@angular/common';
import { HomeComponent } from './component/home/home.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent,HomeComponent]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  
}
