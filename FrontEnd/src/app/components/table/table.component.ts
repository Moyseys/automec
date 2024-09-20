import {AsyncPipe, NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiTable} from '@taiga-ui/addon-table';
import {TuiFormatNumberPipe} from '@taiga-ui/core';

import {
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import type {TuiComparator} from '@taiga-ui/addon-table';
import {TuiDay, tuiToInt} from '@taiga-ui/cdk';
import {TuiScrollable, TuiScrollbar} from '@taiga-ui/core';

@Component({
  selector: 'app-table',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        TuiFormatNumberPipe,
        TuiTable,

        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        CdkVirtualScrollViewport,
        TuiScrollable,
        TuiScrollbar,
        TuiTable,
    ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  protected readonly data = [
        {
            name: 'Alex Inkin',
            balance: 1323525,
        },
        {
            name: 'Roman Sedov',
            balance: 423242,
        },
    ] as const;
 
    protected readonly columns = Object.keys(this.data[0]);
}
