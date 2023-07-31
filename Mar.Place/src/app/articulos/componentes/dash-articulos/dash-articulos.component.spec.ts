import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashArticulosComponent } from './dash-articulos.component';

describe('DashArticulosComponent', () => {
  let component: DashArticulosComponent;
  let fixture: ComponentFixture<DashArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashArticulosComponent]
    });
    fixture = TestBed.createComponent(DashArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
