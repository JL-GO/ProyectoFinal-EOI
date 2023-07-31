import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetArticulosComponent } from './get-articulos.component';

describe('GetArticulosComponent', () => {
  let component: GetArticulosComponent;
  let fixture: ComponentFixture<GetArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetArticulosComponent]
    });
    fixture = TestBed.createComponent(GetArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
