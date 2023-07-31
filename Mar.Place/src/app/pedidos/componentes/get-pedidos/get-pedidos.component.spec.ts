import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPedidosComponent } from './get-pedidos.component';

describe('GetPedidosComponent', () => {
  let component: GetPedidosComponent;
  let fixture: ComponentFixture<GetPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPedidosComponent]
    });
    fixture = TestBed.createComponent(GetPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
