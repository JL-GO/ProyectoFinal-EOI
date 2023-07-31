import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArticulosComponent } from './delete-articulos.component';

describe('DeleteArticulosComponent', () => {
  let component: DeleteArticulosComponent;
  let fixture: ComponentFixture<DeleteArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteArticulosComponent]
    });
    fixture = TestBed.createComponent(DeleteArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
