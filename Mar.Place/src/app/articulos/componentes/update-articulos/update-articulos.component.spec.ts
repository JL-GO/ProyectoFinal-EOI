import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticulosComponent } from './update-articulos.component';

describe('UpdateArticulosComponent', () => {
  let component: UpdateArticulosComponent;
  let fixture: ComponentFixture<UpdateArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateArticulosComponent]
    });
    fixture = TestBed.createComponent(UpdateArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
