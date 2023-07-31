import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPedidosComponent } from './dash-pedidos.component';

describe('DashPedidosComponent', () => {
  let component: DashPedidosComponent;
  let fixture: ComponentFixture<DashPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashPedidosComponent]
    });
    fixture = TestBed.createComponent(DashPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
