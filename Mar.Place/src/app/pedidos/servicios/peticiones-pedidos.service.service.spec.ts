import { TestBed } from '@angular/core/testing';

import { PeticionesPedidosServiceService } from './peticiones-pedidos.service.service';

describe('PeticionesPedidosServiceService', () => {
  let service: PeticionesPedidosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesPedidosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
