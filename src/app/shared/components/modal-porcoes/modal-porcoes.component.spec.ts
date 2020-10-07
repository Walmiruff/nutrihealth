import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPorcoesComponent } from './modal-porcoes.component';

describe('ModalPorcoesComponent', () => {
  let component: ModalPorcoesComponent;
  let fixture: ComponentFixture<ModalPorcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPorcoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPorcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
