import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Home, Wrench, CarFront} from 'lucide-angular';

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
  readonly iconSize = 30;

  public currentRouter: String;

  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    this.currentRouter = router.url
  }

  ngOnInit() {
    console.log(this.currentRouter)
  }

  isActiveRouter(router: String): "active" | ""{
    if (this.currentRouter !== router) return "active"
    return ""
  }

  isCurrentRouter(router: String): boolean{
    return this.currentRouter === router
  }
}
