import { TestBed } from '@angular/core/testing'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment'
import Vehicle from '../../interfaces/Vehicle'
import { VehicleService } from './vehicle.service'

describe('VehicleService', () => {
  let service: VehicleService
  let httpTestingController: HttpTestingController

  const mockVehicle: Vehicle[] = [{
    id: 1,
    brand: 'Toyota',
    model: 'Corolla',
    dateOfManufacture: new Date('2010-01-01T00:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date(),
  }]

  const apiUrl = `${environment.apiUrl}/vehicle`

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    service = TestBed.inject(VehicleService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should be returned Vehicles', () => {
    service.getVehicles().subscribe(vehicles => {
      expect(vehicles).toEqual(mockVehicle)
    })

    const req = httpTestingController.expectOne(`${apiUrl}`)
    expect(req.request.method).toEqual("GET")

    req.flush(mockVehicle)
  })
})
