import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TuiTextfield } from '@taiga-ui/core'
import {
  TuiChevron,
  TuiDataListWrapper,
} from '@taiga-ui/kit'
import { TuiSearch } from '@taiga-ui/layout'
import { LucideAngularModule, Search } from 'lucide-angular'
@Component({
  selector: 'app-searchBar',
  standalone: true,
  exportAs: "Example2",
  imports: [
    ReactiveFormsModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiSearch,
    TuiTextfield,
    LucideAngularModule
  ],
  providers: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Output() searchAction = new EventEmitter()

  readonly Search = Search
  readonly iconStroke = 1.5
  iconSize = 30
  protected searchForm = new FormGroup({
    searchField: new FormControl<String>('')
  })

  ngOnInit() {
    this.onResize()
  }

  protected onSubmit() {
    const { searchField } = this.searchForm.value

    if (!searchField) return
    const searchObj = {
      textSearch: searchField,
    }

    this.searchAction.emit(searchObj)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth
    this.iconSize = width < 700 ? 20 : 30
  }
}

