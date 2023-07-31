import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticulosComponent } from './create-articulos.component';

describe('CreateArticulosComponent', () => {
  let component: CreateArticulosComponent;
  let fixture: ComponentFixture<CreateArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArticulosComponent]
    });
    fixture = TestBed.createComponent(CreateArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
