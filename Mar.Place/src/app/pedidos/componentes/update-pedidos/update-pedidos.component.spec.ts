import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePedidosComponent } from './update-pedidos.component';

describe('UpdatePedidosComponent', () => {
  let component: UpdatePedidosComponent;
  let fixture: ComponentFixture<UpdatePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePedidosComponent]
    });
    fixture = TestBed.createComponent(UpdatePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
