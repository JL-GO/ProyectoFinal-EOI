import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePedidosComponent } from './create-pedidos.component';

describe('CreatePedidosComponent', () => {
  let component: CreatePedidosComponent;
  let fixture: ComponentFixture<CreatePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePedidosComponent]
    });
    fixture = TestBed.createComponent(CreatePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
