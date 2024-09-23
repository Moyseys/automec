import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { LucideAngularModule, Trash, Plus, ArrowDownToLine } from "lucide-angular"
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PartService } from '../../services/part.service';
import * as XLSX from 'xlsx';
import { TuiAlertService } from '@taiga-ui/core';

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
  readonly ArrowDownToLine = ArrowDownToLine

  readonly iconStroke = 2;
  iconSize = 25;

  private readonly alertService = inject(TuiAlertService);

  constructor(private clientPart: PartService){}

  protected onClickBtnPlus() {
    this.toggleForm.emit()
  }

  protected onClickBtnTrash() {
    this.deleteEvent.emit()
  }

  protected onClickBtnArrowDownToLine() {
    this.clientPart.getPart().subscribe({
      next: (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data.parts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Listagem de peças");
        XLSX.writeFile(workbook, "Peças.xlsx", { compression: true })
      },
      error: (error) => {
        this.showNotification("Error ao exportar", "Ocorreu um erro inesperado ao Exportar listagem de peças", "error")
      }
    })
  }

  protected showNotification(title: string, message: string, appearance: 'success' | 'destructive' | 'error' | 'warning'): void {
    this.alertService.open(message, { label: title, appearance }).subscribe();
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
    this.iconSize = width < 1000 ? 20 : 25;
  }
}
