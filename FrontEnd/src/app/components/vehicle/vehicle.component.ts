import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FloatNavComponent } from '../float-nav/float-nav.component';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FloatNavComponent
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

}
