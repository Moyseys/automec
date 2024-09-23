import {NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Output} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {tuiCountFilledControls} from '@taiga-ui/cdk';
import {TuiButton, TuiLink, TuiTextfield} from '@taiga-ui/core';
import {
    TuiChevron,
    TuiDataListWrapper,
    TuiFilter,
    TuiSegmented,
    TuiSwitch,
} from '@taiga-ui/kit';
import {TuiSearch} from '@taiga-ui/layout';
import { LucideAngularModule, Search} from 'lucide-angular';

type Column = 'Id' | 'Marca' | 'Modelo'

@Component({
	selector: 'app-searchBar',
    standalone: true,
    exportAs: "Example2",
    imports: [
        NgForOf,
        ReactiveFormsModule,
        TuiChevron,
        TuiDataListWrapper,
        TuiSearch,
      TuiTextfield,
        LucideAngularModule
    ],
    providers: [
    {
      provide: 'columns',
      useValue: [{label: 'Id', column: "id"}, {label: 'Marca', column: "brand"},{label: 'Modelo', column: "model"}],
    },
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
    @Output() searchAction= new EventEmitter()

      readonly Search = Search;

      readonly iconStroke = 1.5;
      iconSize = 30;

    protected readonly items = inject<readonly Column[]>('columns' as any)
    protected hashTable: { [key in Column]: { label: Column, column: string} } = {
      Id: { label: 'Id', column: 'id' },
      Marca: { label: 'Marca', column: 'brand' },
      Modelo: { label: 'Modelo', column: 'model' },
    };

    protected labelsArray = ['Id', 'Marca', 'Modelo'];

    protected searchForm = new FormGroup({
      searchField: new FormControl<String>('')
    })

  ngOnInit() {
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth;
    this.iconSize = width < 700 ? 20 : 30;
  }

  protected onSubmit() {
    const {searchField} = this.searchForm.value

    const searchObj = {
        textSearch: searchField,
      }

      this.searchAction.emit(searchObj)
    }
}

