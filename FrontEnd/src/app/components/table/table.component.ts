import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable, TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import {
  TuiAutoColorPipe,
  TuiButton,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
  TuiLink,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import {
  TuiTablePagination,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
import { PartService } from '../../services/part.service';
import Part from '../../../interfaces/Part';
import Vehicle from '../../../interfaces/Vehicle';
import { BehaviorSubject, combineLatest } from 'rxjs';

interface DataTable extends Part {
  Vehicles: Vehicle[]
  selected: boolean
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTitle,
    TuiTablePagination,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  protected size: 's' | 'm' | 'l' = "m";


  protected data = signal<DataTable[]>([])
  protected readonly total$ = new BehaviorSubject(0);
  protected readonly size$ = new BehaviorSubject(10);
  protected readonly page$ = new BehaviorSubject(1)

  protected sizeOptions = [5, 10, 15, 30, 50, this.total$.getValue()];

  constructor(private service: PartService) { }

  ngOnInit(): void {
    combineLatest([this.page$, this.size$]).subscribe(([page, size]) => {
    console.log(`Request page ${page} de ${size} itens`);

    this.updateDataTable(page, size);
  });

  this.total$.subscribe(total => {
    this.sizeOptions = [5, 10, 15, 30, 50, total];
  });
}


  private updateDataTable(page: number, size: number): void {
    try {
      this.service.getPart(page, size, "", "").subscribe({
        next: (data) => {
          const { total, parts } = data
          console.log(parts)

          const datatTable = parts.map(part => {
            const newPart = {
              ...part,
              selected: false
            } as DataTable

            return newPart
          })

          this.total$.next(total)
          this.data.set(datatTable)
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log('Requisição completa');
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  protected get checked(): boolean | null {
    const every = this.data().every(({ selected }) => selected);
    const some = this.data().some(({ selected }) => selected);

    return every || (some && null);
  }

  protected onCheck(checked: boolean): void {
    this.data().forEach((item) => {
      item.selected = checked;
    });
  }

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
      console.log(page + 1, size)
      this.page$.next(page + 1);
      this.size$.next(size);
    }
}
