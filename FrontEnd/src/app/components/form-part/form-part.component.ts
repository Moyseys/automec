import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http'

import { TuiAlertService, TuiDataList } from '@taiga-ui/core'
import { TuiDataListWrapper, TuiFilterByInputPipe, TuiStringifyContentPipe } from '@taiga-ui/kit'
import { TuiMultiSelectModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy'

import Part from '../../../interfaces/Part'
import Vehicle from '../../../interfaces/Vehicle'

import { PartService } from '../../services/part.service'
import { VehicleService } from '../../services/vehicle.service'

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
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiStringifyContentPipe,
    TuiFilterByInputPipe
  ],
  templateUrl: './form-part.component.html',
  styleUrls: ['./form-part.component.css']
})
export class FormPartComponent {
  @Output() toggleForm = new EventEmitter<void>()
  @Input() partData?: Part | null
  private readonly alertService = inject(TuiAlertService)

  protected method: "POST" | "PUT" = "POST"
  protected vehicles: Vehicle[] = []
  protected isDisabled = true
  protected stringify = (item: Part): string => `${item.brand} - ${item.model}`

  public partForm = new FormGroup({
    partNumber: new FormControl<String>('', Validators.required),
    brand: new FormControl<String>('', Validators.required),
    model: new FormControl<String>('', Validators.required),
    vehicles: new FormControl<Vehicle[]>([], Validators.required),
  })

  constructor(
    private readonly partService: PartService,
    private readonly vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.loadVehicles()
    if (this.partData && this.partData.Vehicles) {
      this.partForm.get("partNumber")?.setValue(this.partData.partNumber)
      this.partForm.get("brand")?.setValue(this.partData.brand)
      this.partForm.get("model")?.setValue(this.partData.model)
      this.partForm.get("vehicles")?.setValue(this.partData.Vehicles)

      this.method = "PUT"
    }
  }

  protected loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data
      },
      error: () => this.showNotification('Erro ao carregar veículos', 'Não foi possível carregar a lista de veículos.', 'error')
    })
  }

  private updatePart(partNumber: String, newPartNumber: String, brand: string, model: string, vehicleIds: number[]): void {
    this.partService.putPart(partNumber, newPartNumber, brand, model, vehicleIds).subscribe({
      next: () => {
        this.showNotification('Sucesso', 'Peça Atualizada com sucesso!', 'success')
        this.onClickBack()
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error?.error || 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
        this.showNotification('Erro ao atualizar peça', errorMessage, 'error')
      }
    })
  }

  private savePart(partNumber: string, brand: string, model: string, vehicleIds: number[]): void {
    this.partService.postPart(partNumber, brand, model, vehicleIds).subscribe({
      next: () => {
        this.showNotification('Sucesso', 'Peça cadastrada com sucesso!', 'success')
        this.partForm.reset()
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error?.error || 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
        this.showNotification('Erro ao salvar peça', errorMessage, 'error')
      }
    })
  }

  onClickBack(): void {
    this.partForm.patchValue({
      partNumber: "",
      brand: "",
      model: "",
      vehicles: []
    })

    this.toggleForm.emit()
  }


  onSubmit(): void {
    const { partNumber, brand, model, vehicles } = this.partForm.value as {
      partNumber: string
      brand: string
      model: string
      vehicles: Vehicle[]
    }

    if (!this.isFormValid(partNumber, brand, model, vehicles)) {
      return
    }

    const vehicleIds = vehicles.map(vehicle => vehicle.id) as number[]

    if (this.method === "POST") return this.savePart(partNumber, brand, model, vehicleIds)

    const partNumberWithoutEdit = this.partData?.partNumber as String
    this.updatePart(partNumberWithoutEdit, partNumber, brand, model, vehicleIds)
  }

  private isFormValid(partNumber: string, brand: string, model: string, vehicles: Vehicle[]): boolean {
    if (!partNumber || partNumber.trim() === '') {
      this.showNotification('Formulário inválido', 'O campo "PartNumber" é obrigatório.', 'warning')
      return false
    }

    if (!brand || brand.trim() === '') {
      this.showNotification('Formulário inválido', 'O campo "Marca" é obrigatório.', 'warning')
      return false
    }

    if (!model || model.trim() === '') {
      this.showNotification('Formulário inválido', 'O campo "Modelo" é obrigatório.', 'warning')
      return false
    }

    if (!vehicles || vehicles.length === 0) {
      this.showNotification('Formulário inválido', 'Selecione ao menos um veículo.', 'warning')
      return false
    }

    return true
  }

  protected showNotification(title: string, message: string, appearance: 'success' | 'destructive' | 'error' | 'warning'): void {
    this.alertService.open(message, { label: title, appearance }).subscribe()
  }

  public getVehiclesList(): Vehicle[] {
    return this.vehicles
  }
}
