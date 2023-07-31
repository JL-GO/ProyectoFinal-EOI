import { TestBed } from '@angular/core/testing';

import { PeticionesArticulosServiceService } from './peticiones-articulos.service.service';

describe('PeticionesArticulosServiceService', () => {
  let service: PeticionesArticulosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesArticulosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
