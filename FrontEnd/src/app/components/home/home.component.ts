import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LucideAngularModule, Wrench, CarFront} from 'lucide-angular';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    LucideAngularModule,
    TuiButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly Wrench = Wrench;
  readonly CarFront = CarFront;

  readonly iconStroke = 1.5;
  readonly iconSize = 100;
}
