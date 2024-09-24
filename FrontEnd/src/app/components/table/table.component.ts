import { CommonModule, NgForOf } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TuiTable, TuiTablePaginationEvent } from '@taiga-ui/addon-table'
import {
  TuiAlertService,
  TuiAutoColorPipe,
  TuiButton,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
  TuiLink,
  TuiTitle,
} from '@taiga-ui/core'
import {
  TuiBadge,
  TuiCheckbox,
  TuiItemsWithMore,
} from '@taiga-ui/kit'
import { TuiCell } from '@taiga-ui/layout'
import {
  TuiTablePagination,
} from '@taiga-ui/addon-table'
import { PartService } from '../../services/part.service'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import DataTable from '../../../interfaces/DataTable'
import SearchObj from '../../../interfaces/SearchObj'
import Part from '../../../interfaces/Part'
import Vehicle from '../../../interfaces/Vehicle'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    TuiAutoColorPipe,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
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

  protected size: 's' | 'm' | 'l' = "m"
  protected dataTable = signal<DataTable[]>([])

  protected readonly total$ = new BehaviorSubject(0)
  protected readonly pagination$ = new BehaviorSubject<{
    limit: number,
    page: number
  }>({
    limit: 10,
    page: 1
  })
  private readonly alertService = inject(TuiAlertService)

   protected readonly sorter$ = new BehaviorSubject<string>('id'); // Coluna para ordenação
  protected readonly direction$ = new BehaviorSubject<'asc' | 'desc'>('asc'); // Direção da ordenação
  protected sizeOptions = [5, 10, 15, 30, 50, this.total$.getValue()]

  constructor(private service: PartService) { }

  ngOnInit(): void {
    this.onResize()

    this.pagination$.subscribe(({page, limit}) => {
      this.updateDataTable(page, limit)
    })
  }

  public deleteSelectedValues() {
    const rowsSelected = this.dataTable().filter(dataTable => dataTable.selected)
    if (rowsSelected.length <= 0) return this.showNotification('Nunhuma linha selecionada', 'Selecione ao menos uma linha para excluir', 'warning')

    const partsIds = rowsSelected
      .map(dataTable => dataTable.id) as number[]

    this.service.deleteParts(partsIds).subscribe({
      next: (data) => {
        this.showNotification('Sucesso', String(data), 'success')
        const { page, limit } = this.pagination$.getValue()
        this.updateDataTable(page, limit)
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error || 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
        this.showNotification('Erro ao excluir peça', errorMessage, 'error')
      }
    })
  }

  public updateDataTable(page: number | '', limit: number | '', brand?: string, model?: string): void {
    this.service.getPart(page, limit, brand || "", model || "").subscribe({
      next: (data) => {
        const { total, parts } = data
        const newDataTable = this.partToDataTable(parts)

        this.total$.next(total)
        this.dataTable.set(newDataTable)
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error || 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
        this.showNotification('Erro ao atualizar sua peça', errorMessage, 'error')
      }
    })
  }

  onClickRow(dataTable: DataTable) {
    this.clickRow.emit(dataTable)
  }

  onSearch(searchObj: SearchObj) {
    this.service.getPart(1, 1000, "", "").subscribe({
      next: (data) => {
        const { total, parts } = data

        const newParts = this.filterParts(parts, searchObj.textSearch)
        const datatTable = this.partToDataTable(newParts)

        this.total$.next(total)
        this.dataTable.set(datatTable)
      },
      error: (error) => {
        const errorMessage = error.error || 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
        this.showNotification('Erro ao realizar a pesquisa', errorMessage, 'error')
      }
    })
  }

  private filterParts(parts: Part[], searchTerm: string): Part[] {
    const lowerSearchTerm = searchTerm.toLowerCase()

    return parts.filter((part: Part) => {
      const createdAtISO = new Date(String(part.createdAt)).toISOString()
      const updatedAtISO = new Date(String(part.updatedAt)).toISOString()

      return (
        part.brand.toLowerCase().includes(lowerSearchTerm) ||
        part.model.toLowerCase().includes(lowerSearchTerm) ||
        part.partNumber.toLowerCase().includes(lowerSearchTerm) ||
        String(part.id).includes(lowerSearchTerm) ||
        createdAtISO.includes(lowerSearchTerm) ||
        updatedAtISO.includes(lowerSearchTerm) ||
        this.vehicleMatchesSearch(part.Vehicles, lowerSearchTerm)
      )
    })
  }

  private vehicleMatchesSearch(vehicles: Vehicle[] | undefined, searchTerm: string): boolean {
    return vehicles?.some((vehicle: Vehicle) => vehicle.model.toLowerCase().includes(searchTerm)) || false
  }

  protected get checked(): boolean | null {
    const every = this.dataTable().every(({ selected }) => selected)
    const some = this.dataTable().some(({ selected }) => selected)

    return every || (some && null)
  }

  protected onCheck(checked: boolean): void {
    this.dataTable().forEach((item) => {
      item.selected = checked
    })
  }

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.pagination$.next({
      page: page + 1,
      limit: size
    })
  }

  protected showNotification(title: string, message: string, appearance: 'success' | 'destructive' | 'error' | 'warning'): void {
    this.alertService.open(message, { label: title, appearance }).subscribe()
  }

  private partToDataTable(parts: Part[]) {
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

    return datatTable
  }

  protected formatDate(date: string): string {
    const newDate = new Date(date)

    const day = String(newDate.getDate()).padStart(2, '0')
    const month = String(newDate.getMonth() + 1).padStart(2, '0')
    const year = newDate.getFullYear()

    return `${day}/${month}/${year}`
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth

    this.size = width < 920 ? "s" : 'm'
  }
}
