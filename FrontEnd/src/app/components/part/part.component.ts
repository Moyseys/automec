import { Component, signal, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FloatNavComponent } from '../float-nav/float-nav.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableComponent } from "../table/table.component";
import { FormPartComponent } from '../form-part/form-part.component';
import DataTable from '../../../interfaces/DataTable';
import SearchObj from '../../../interfaces/SearchObj';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [
    SidebarComponent,
    FloatNavComponent,
    NavbarComponent,
    TableComponent,
    FormPartComponent
],
  templateUrl: './part.component.html',
  styleUrl: './part.component.css'
})
export class PartComponent {
  protected showForm = signal<boolean>(false)
  @ViewChild('tableComponent') tableComponent!: TableComponent;

  protected partData = signal<DataTable | null>(null);

  protected toggleShowForm() {
    this.partData.set(null)
    this.showForm.set(!this.showForm())
  }

  clickRow(data: any) {
    this.toggleShowForm()
    this.partData.set(data)
  }

  deleteValuesInTable() {
    this.tableComponent.deleteSelectedValues();
  }

  protected searchActionHanlder(searchObj: SearchObj) {
    this.tableComponent.onSearch(searchObj)
  }
}
