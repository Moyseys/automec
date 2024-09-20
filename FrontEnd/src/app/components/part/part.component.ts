import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FloatNavComponent } from '../float-nav/float-nav.component';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FloatNavComponent
  ],
  templateUrl: './part.component.html',
  styleUrl: './part.component.css'
})
export class PartComponent {

}
