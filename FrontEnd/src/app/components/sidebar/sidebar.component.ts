import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Home, Wrench, CarFront } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly Home = Home;
  readonly Wrench = Wrench;
  readonly CarFront = CarFront;

  readonly iconStroke = 2;
  iconSize = 30;

  public currentRouter: String;

  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    this.currentRouter = router.url
  }

  ngOnInit() {
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth;
    this.iconSize = width < 500 ? 20 : 30;
  }

  isActiveRouter(router: String): "active" | "" {
    if (this.currentRouter !== router) return "active"
    return ""
  }

  isCurrentRouter(router: String): boolean {
    return this.currentRouter === router
  }
}
