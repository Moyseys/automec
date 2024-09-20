import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FloatNavComponent } from '../float-nav/float-nav.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    SidebarComponent,
    FloatNavComponent,
    NavbarComponent
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

}
