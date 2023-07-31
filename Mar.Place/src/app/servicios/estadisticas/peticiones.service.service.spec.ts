import { TestBed } from '@angular/core/testing';

import { PeticionesServiceService } from './peticiones.service.service';

describe('PeticionesServiceService', () => {
  let service: PeticionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
