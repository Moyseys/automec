import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import Part from '../../interfaces/Part'
import Brand from '../../interfaces/Brand'
import { environment } from '../../environment/environment'
import ResponseGetPart from '../../interfaces/ResponseGetPart'


@Injectable({
  providedIn: 'root'
})
export class PartService {
  private url = environment.apiUrl
  constructor(private client: HttpClient) { }

  getPart(page: number | String = '', limit: number | String = '', brand: String = '', model: String | null = ''): Observable<ResponseGetPart> {
    const res = this.client.get<ResponseGetPart>(`${this.url}/part?page=${page}&limit=${limit}&brand=${brand}&model=${model}`)

    return res
  }

  postPart(partNumber: String, brand: String, model: String, vehicles: number[]): Observable<Part> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const res = this.client.post<Part>(`${this.url}/part`, {
      partNumber,
      brand,
      model,
      vehiclesIds: vehicles
    }, {
      headers
    })

    return res
  }
  
  putPart(partNumber: String, newPartNumber: String, brand: String, model: String, vehicles: number[]): Observable<Part> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const res = this.client.put<Part>(`${this.url}/part/${partNumber}`, {
      newPartNumber,
      brand,
      model,
      vehiclesIds: vehicles
    }, {
      headers
    })

    return res
  }

  deleteParts(partsIds: number[]): Observable<String> {
    const res = this.client.delete<String>(`${this.url}/part`, {
      body: { partsIds: partsIds }
    })

    return res
  }

  get getClient(): HttpClient{
    return this.client
  }
}
