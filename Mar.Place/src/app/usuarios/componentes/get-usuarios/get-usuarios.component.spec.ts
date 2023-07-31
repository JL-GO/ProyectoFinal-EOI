import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsuariosComponent } from './get-usuarios.component';

describe('GetUsuariosComponent', () => {
  let component: GetUsuariosComponent;
  let fixture: ComponentFixture<GetUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUsuariosComponent]
    });
    fixture = TestBed.createComponent(GetUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
