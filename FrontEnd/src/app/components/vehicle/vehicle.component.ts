import { Component, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FloatNavComponent } from '../float-nav/float-nav.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableComponent } from "../table/table.component";
import { FormPartComponent } from '../form-part/form-part.component';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    SidebarComponent,
    FloatNavComponent,
    NavbarComponent,
    TableComponent,
    FormPartComponent
],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  protected showForm = signal<boolean>(true)

  protected toggleShowForm() {
    this.showForm.set(!this.showForm())
  }
}
