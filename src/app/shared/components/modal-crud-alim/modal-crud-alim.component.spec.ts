import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrudAlimComponent } from './modal-crud-alim.component';

describe('ModalCrudAlimComponent', () => {
  let component: ModalCrudAlimComponent;
  let fixture: ComponentFixture<ModalCrudAlimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrudAlimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrudAlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
