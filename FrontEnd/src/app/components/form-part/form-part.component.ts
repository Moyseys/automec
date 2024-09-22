import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiAlertService, TuiAppearanceOptions, TuiDataList} from '@taiga-ui/core';
import {TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiMultiSelectModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import { PartService } from '../../services/part.service';

@Component({
  selector: 'app-form-part',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TuiMultiSelectModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiTextfieldControllerModule
  ],
  templateUrl: './form-part.component.html',
  styleUrl: './form-part.component.css'
})
export class FormPartComponent {
  @Output() totoggleForm = new EventEmitter()
  private readonly alerts = inject(TuiAlertService);

  protected items = [
    'Luke Skywalker',
    'Leia Organa Solo',
    'Darth Vader',
    'Han Solo',
    'Obi-Wan Kenobi',
    'Yoda',
  ]

  constructor(private client: PartService) { }

  protected getVehicles(page: number, limit: number, brand: String, model: String) {
    try {
      this.client.getPart(page, limit, brand, model).subscribe({
        next: (data) => {
          return data
        },
      })
    } catch (error) {
      this.showNotification('Formulário inválido', 'Não foi possível acessar os veículos registrados!', 'error')
      return
    }
  }
  isDisabled = true;
  protected onSelectFocus() {
    // const { brand, vehicles } = this.partForm.value
    // const data = this.getVehicles(1, 1000, brand, vehicles)
    // console.log(data)
  }

  partForm = new FormGroup({
    partNumber: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    vehicles: new FormControl([], Validators.required),
});

  onClickBtnBack() {
    this.totoggleForm.emit()
  }

  protected showNotification(title: String, subTitle: String, aparence: 'accent' | 'destructive' | 'error' | 'warning' ): void {
      this.alerts
        .open(subTitle, {
          label: title,
          appearance: aparence
        })
          .subscribe();
  }

    onSubmit() {

    if (this.partForm.valid) {
      const formData = this.partForm.value;

      // Aqui você pode fazer a requisição
      // this.http.post('URL_DO_SEU_ENDPOINT', formData).subscribe(response => {
      //   console.log('Dados enviados com sucesso', response);
      // }, error => {
      //   console.error('Erro ao enviar os dados', error);
      // });
    } else {
      this.showNotification('Formulário inválido', 'Preencha todos os campos adequadamente!', 'warning')
    }
  }
}
