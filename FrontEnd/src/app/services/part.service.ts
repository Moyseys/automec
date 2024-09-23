import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Part from '../../interfaces/Part';
import Brand from '../../interfaces/Brand';

interface ResponseGetPart {
  total: number,
	totalOfPages: number,
  currentPage: number,
  parts: Part[]
}

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private url = `http://localhost:3000`
  constructor(private client: HttpClient) { }

  getPart(page: number, limit: number, brand: String, model: String | null): Observable<ResponseGetPart> {
    const res = this.client.get<ResponseGetPart>(`${this.url}/part?page=${page}&limit=${limit}&brand=${brand}&model=${model}`)

    return res
  }

  postPart(partNumber: String, brand: String, model: String, vehicles: number[]): Observable<Part> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

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
    });

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

  getModels(brandName: string): Observable<String[]> {
    const res = this.client.get<String[]>(`${this.url}/model?brand=${brandName}`)

    return res
  }

  getBrands(): Observable<Brand[]> {
    const res = this.client.get<{id: number, name: string, models: String[]}[]>(`${this.url}/brand`)

    return res
  }

  deleteParts(partsIds: number[]): Observable<String> {
    const res = this.client.delete<String>(`${this.url}/part`, {
      body: { partsIds: partsIds }
    });

    return res;
  }
}
