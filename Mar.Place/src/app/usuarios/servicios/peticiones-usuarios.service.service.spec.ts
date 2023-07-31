import { TestBed } from '@angular/core/testing';

import { PeticionesUsuariosServiceService } from './peticiones-usuarios.service.service';

describe('PeticionesUsuariosServiceService', () => {
  let service: PeticionesUsuariosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesUsuariosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
