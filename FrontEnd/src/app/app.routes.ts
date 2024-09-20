import { Routes } from '@angular/router';

import { VehicleComponent } from './components/vehicle/vehicle.component';
import { HomeComponent } from './components/home/home.component';
import { PartComponent } from './components/part/part.component';

export const routes: Routes = [
  {
    path: "vehicle", component: VehicleComponent
  },
  {
    path: "part", component: PartComponent
  },
  {
    path: "", component: HomeComponent
  },

];
