import {NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
import {map} from 'rxjs';

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
    ],
    providers: [
    {
      provide: 'columns',
      useValue: ['Id', 'Marca', 'Modelo', 'Ano'],
    },
  ],
    templateUrl: './search-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
    protected readonly form = new FormGroup({
        search: new FormControl(),
        select: new FormControl(),
    });

    protected readonly items = inject<readonly string[]>('columns' as any)
}

