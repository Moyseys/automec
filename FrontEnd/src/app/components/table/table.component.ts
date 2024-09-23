import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable, TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import {
  TuiAlertService,
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
} from '@taiga-ui/addon-table';
import { PartService } from '../../services/part.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import DataTable from '../../../interfaces/DataTable';
import SearchObj from '../../../interfaces/SearchObj';
import Part from '../../../interfaces/Part';
import Vehicle from '../../../interfaces/Vehicle';



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
  @Output() clickRow = new EventEmitter<DataTable>()

  protected size: 's' | 'm' | 'l' = "m";

  protected data = signal<DataTable[]>([])
  protected readonly total$ = new BehaviorSubject(0);
  protected readonly limit$ = new BehaviorSubject(10);
  protected readonly page$ = new BehaviorSubject(1)
  private readonly alertService = inject(TuiAlertService);

  protected sizeOptions = [5, 10, 15, 30, 50, this.total$.getValue()];

  constructor(private service: PartService) { }

  ngOnInit(): void {
    this.onResize()
    combineLatest([this.page$, this.limit$]).subscribe(([page, size]) => {
      this.updateDataTable(page, size);
    });

    this.total$.subscribe(total => {
      this.sizeOptions = [5, 10, 15, 30, 50, total];
    });
  }

  protected showNotification(title: string, message: string, appearance: 'success' | 'destructive' | 'error' | 'warning'): void {
    this.alertService.open(message, { label: title, appearance }).subscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth;

    this.size = width < 920 ? "s" : 'm';
  }

  onClickRow(dataTable: DataTable) {
    this.clickRow.emit(dataTable)
  }

  onSearch(searchObj: SearchObj) {
    console.log(searchObj)
    this.service.getPart(1, 1000, "", "").subscribe({
      next: (data) => {
        const { total, parts } = data

        const newParts = this.filterParts(parts, searchObj.textSearch)

        const datatTable = newParts.map(part => {
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
      }
    })
  }

  private filterParts(parts: Part[], searchTerm: string): Part[] {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return parts.filter((part: Part) => {
      const createdAtISO = new Date(String(part.createdAt)).toISOString();
      const updatedAtISO = new Date(String(part.updatedAt)).toISOString();

      return (
        part.brand.toLowerCase().includes(lowerSearchTerm) ||
        part.model.toLowerCase().includes(lowerSearchTerm) ||
        part.partNumber.toLowerCase().includes(lowerSearchTerm) ||
        String(part.id).includes(lowerSearchTerm) ||
        createdAtISO.includes(lowerSearchTerm) ||
        updatedAtISO.includes(lowerSearchTerm) ||
        this.vehicleMatchesSearch(part.Vehicles, lowerSearchTerm)
      );
    });
  }

  private vehicleMatchesSearch(vehicles: Vehicle[] | undefined, searchTerm: string): boolean {
    return vehicles?.some((vehicle: Vehicle) => vehicle.model.toLowerCase().includes(searchTerm)) || false;
  }

  deleteSelectedValues() {
    const rowsSelected = this.data()
      .filter(dataTable => dataTable.selected)
    if (rowsSelected.length <= 0) return

    const partsIds = rowsSelected
      .map(dataTable => dataTable.id) as number[]

    this.service.deleteParts(partsIds).subscribe({
      next: (data) => {
        this.showNotification('Sucesso', String(data), 'success')
        this.updateDataTable(this.page$.getValue(), this.limit$.getValue())
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error || 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        this.showNotification('Erro ao salvar peça', errorMessage, 'error');
      }
    })
  }

  protected formatDate(date: string): string {
    const newDate = new Date(date)

  const day = String(newDate.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se necessário
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Meses começam em 0, então adicionamos 1
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}

  public updateDataTable(page: number | null, limit: number | null, brand?: string, model?: string): void {
    try {
      if (!page || !limit) {
        page = this.page$.getValue()
        limit = this.limit$.getValue()
      }
      this.service.getPart(page, limit, brand || "", model || "").subscribe({
        next: (data) => {
          const { total, parts } = data

          const datatTable = parts.map(part => {
            const { createdAt, updatedAt } = part
            const newPart = {
              ...part,
              createdAt: this.formatDate(String(createdAt) || ""),
              updatedAt: this.formatDate(String(updatedAt) || ""),
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
    this.page$.next(page + 1);
    this.limit$.next(size);
  }
}
