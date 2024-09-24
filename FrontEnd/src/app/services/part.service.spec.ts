import { TestBed } from '@angular/core/testing'
import { PartService } from './part.service'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment'
import ResponseGetPart from '../../interfaces/ResponseGetPart'
import Part from '../../interfaces/Part'

describe('PartService', () => {
  let service: PartService
  let httpTestingController: HttpTestingController

  const mockPart: Part = {
    id: 1,
    partNumber: 'BOS1234',
    brand: 'Bosch',
    model: 'F00E262001',
    createdAt: new Date(),
    updatedAt: new Date(),
    Vehicles: []
  }

  const mockParts: ResponseGetPart = {
    total: 8,
    totalOfPages: 1,
    currentPage: 1,
    parts: [mockPart]
  }

  const apiUrl = `${environment.apiUrl}/part`

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    service = TestBed.inject(PartService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should be used crrectaly URL', () => {
    const spy = spyOn(service.getClient, "get").and.callThrough()

    service.getPart()
    expect(spy).toHaveBeenCalledWith(`${environment.apiUrl}/part?page=&limit=&brand=&model=`)

  })

  it('should fetch parts from API', () => {
    service.getPart().subscribe(parts => {
      console.log(parts)
      expect(parts).toEqual(mockParts)
    })

    const req = httpTestingController.expectOne(`${environment.apiUrl}/part?page=&limit=&brand=&model=`)
    expect(req.request.method).toEqual('GET')
    req.flush(mockParts)
  })

  it('should post part to API', () => {
    const partNumber = 'BOS1234'
    const brand = 'Bosch'
    const model = 'F00E262001'
    const vehicles = [1, 2]

    service.postPart(partNumber, brand, model, vehicles).subscribe(part => {
      expect(part).toEqual(mockPart)
    })

    const req = httpTestingController.expectOne(`${environment.apiUrl}/part`)
    expect(req.request.method).toEqual('POST')
    expect(req.request.body).toEqual({
      partNumber,
      brand,
      model,
      vehiclesIds: vehicles
    })

    req.flush(mockPart)
  })

  it('should update part to API', () => {
    const partNumber = 'BOS1234'
    const newPartNumber = 'BOS5678'
    const brand = 'Bosch'
    const model = 'F00E262001'
    const vehicles = [1, 2]

    service.putPart(partNumber, newPartNumber, brand, model, vehicles).subscribe(part => {
      expect(part).toEqual(mockPart)
    })

    const req = httpTestingController.expectOne(`${environment.apiUrl}/part/${partNumber}`)
    expect(req.request.method).toEqual("PUT")
    expect(req.request.body).toEqual({
      newPartNumber,
      brand,
      model,
      vehiclesIds: vehicles
    })

    req.flush(mockPart)
  })

  it('should delete parts from API', () => {
    const partsIds = [1, 2, 3]
    const expectedResponse = 'Parts deleted successfully'

    service.deleteParts(partsIds).subscribe(response => {
      expect(response).toEqual(expectedResponse)
    })

    const req = httpTestingController.expectOne(`${environment.apiUrl}/part`)
    expect(req.request.method).toEqual('DELETE')
    expect(req.request.body).toEqual({ partsIds })

    req.flush(expectedResponse)
  })
})
