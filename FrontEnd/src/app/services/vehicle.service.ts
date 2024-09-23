import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Vehicle from '../../interfaces/Vehicle';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private url = environment.apiUrl
  constructor(private client: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    const res = this.client.get<Vehicle[]>(`${this.url}/vehicle`)

    return res
  }
}
