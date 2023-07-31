import { TestBed } from '@angular/core/testing';

import { AppAutentificacionServiceService } from './app-autentificacion.service.service';

describe('AppAutentificacionServiceService', () => {
  let service: AppAutentificacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAutentificacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
