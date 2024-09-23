import { Component, EventEmitter, HostListener, Input, Output, output } from '@angular/core';
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
  @Output() deleteEvent = new EventEmitter()
  @Output() searchAction = new EventEmitter()

  readonly Trash = Trash
  readonly Plus = Plus

  readonly iconStroke = 2.5;
  iconSize = 30;

  protected onClickBtnPlus() {
    this.toggleForm.emit()
  }

  protected onClickBtnTrash() {
    this.deleteEvent.emit()
  }

  protected searchActionHanlder(searchObj: any) {
    this.searchAction.emit(searchObj)
  }

  ngOnInit() {
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth;
    this.iconSize = width < 1000 ? 25 : 30;
  }
}
