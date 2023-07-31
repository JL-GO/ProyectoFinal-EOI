import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePedidosComponent } from './delete-pedidos.component';

describe('DeletePedidosComponent', () => {
  let component: DeletePedidosComponent;
  let fixture: ComponentFixture<DeletePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePedidosComponent]
    });
    fixture = TestBed.createComponent(DeletePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
