import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Part from '../../interfaces/Part';

interface Response {
  total: number,
	totalOfPages: number,
  currentPage: number,
  parts: Part[]
}

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private url = `http://localhost:3000/part`
  constructor(private client: HttpClient) { }

  getPart(page: number, limit: number, brand: String, model: String): Observable<Response> {
    const res = this.client.get<Response>(`${this.url}?page=${page}&limit=${limit}&brand=${brand}&model=${model}`)

    return res
  }
}
