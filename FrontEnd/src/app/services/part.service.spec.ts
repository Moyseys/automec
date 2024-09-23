import { TestBed } from '@angular/core/testing';
import { PartService } from './part.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

fdescribe('PartService', () => {
  let service: PartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be used crrectaly URL', () => {
    const spy = spyOn(service.getClient, "get").and.callThrough()

    service.getPart()
    expect(spy).toHaveBeenCalledWith(`${environment.apiUrl}/part?page=&limit=&brand=&model=`)

  });
});
