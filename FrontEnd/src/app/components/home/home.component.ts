import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LucideAngularModule, Wrench, CarFront} from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    LucideAngularModule,
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
  iconSize = 100;

  ngOnInit() {
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?: Event) {
      if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      this.iconSize = width < 920 ? 70 : 100;
    }
  }
}
