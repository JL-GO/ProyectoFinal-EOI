import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUsuariosComponent } from './dash-usuarios.component';

describe('DashUsuariosComponent', () => {
  let component: DashUsuariosComponent;
  let fixture: ComponentFixture<DashUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashUsuariosComponent]
    });
    fixture = TestBed.createComponent(DashUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
