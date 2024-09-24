import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormPartComponent } from './form-part.component'
import { PartService } from '../../services/part.service'
import { VehicleService } from '../../services/vehicle.service'
import { of } from 'rxjs'
import Vehicle from '../../../interfaces/Vehicle'
import Part from '../../../interfaces/Part'
import { TuiAlertService } from '@taiga-ui/core'

fdescribe('FormPartComponent', () => {
  let component: FormPartComponent
  let fixture: ComponentFixture<FormPartComponent>
  let partService: jasmine.SpyObj<PartService>
  let vehicleService: jasmine.SpyObj<VehicleService>
  let alertService: jasmine.SpyObj<TuiAlertService>

  beforeEach(async () => {
    const partServiceSpy = jasmine.createSpyObj('PartService', ['postPart'])
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles'])
    const alertServiceSpy = jasmine.createSpyObj('TuiAlertService', ['open'])

    vehicleServiceSpy.getVehicles.and.returnValue(of([]))

    await TestBed.configureTestingModule({
      imports: [FormPartComponent],
      providers: [
        { provide: PartService, useValue: partServiceSpy },
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: TuiAlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FormPartComponent)
    component = fixture.componentInstance

    partService = TestBed.inject(PartService) as jasmine.SpyObj<PartService>
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>
    alertService = TestBed.inject(TuiAlertService) as jasmine.SpyObj<TuiAlertService>

    fixture.detectChanges()
  })

  const mockVehicles: Vehicle[] = [
    { id: 1, brand: 'Toyota', model: 'Corolla', dateOfManufacture: new Date() },
    { id: 2, brand: 'Honda', model: 'Civic', dateOfManufacture: new Date() }
  ];

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should load vehicles on init', () => {
    vehicleService.getVehicles.and.returnValue(of(mockVehicles));
    component.ngOnInit();

    expect(vehicleService.getVehicles).toHaveBeenCalled();
    expect(component.getVehiclesList()).toEqual(mockVehicles);
  })

  // it('should save part successfully', () => {
  //   const mockPart: Part = {
  //     id: 1,
  //     partNumber: 'BOS1234',
  //     brand: 'Bosch',
  //     model: 'F00E262001',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     Vehicles: mockVehicles
  //   };
  //   partService.postPart.and.returnValue(of(mockPart));

  //   component.partForm.setValue({ partNumber: 'BOS1234', brand: 'Bosch', model: 'F00E262001', vehicles: mockVehicles });
  //   console.log("teste")
  //   console.log(component.partForm.value)
  //   component.onSubmit();

  //   expect(partService.postPart).toHaveBeenCalledWith('BOS1234', 'Bosch', 'F00E262001', [1, 2]);
  //   expect(alertService.open).toHaveBeenCalledWith('Peça cadastrada com sucesso!', { label: 'Sucesso', appearance: 'success' });
  //   //expect(component.partForm.value).toEqual({ partNumber: '', brand: '', model: '', vehicles: [] });
  // });
})
