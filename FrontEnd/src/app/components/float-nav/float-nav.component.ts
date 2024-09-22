import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { LucideAngularModule, Trash, Plus } from "lucide-angular"
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-float-nav',
  standalone: true,
  imports: [
    LucideAngularModule,
    SearchBarComponent
  ],
  templateUrl: './float-nav.component.html',
  styleUrl: './float-nav.component.css'
})
export class FloatNavComponent {
  @Input() title: String = "";
  @Output() toggleForm = new EventEmitter()

  readonly Trash = Trash
  readonly Plus = Plus

  readonly iconStroke = 2.5;
  readonly iconSize = 30;

  protected onClickBtnPlus() {
    this.toggleForm.emit()
  }
}
