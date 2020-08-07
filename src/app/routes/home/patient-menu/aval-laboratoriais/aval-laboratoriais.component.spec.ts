import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalLaboratoriaisComponent } from './aval-laboratoriais.component';

describe('AvalLaboratoriaisComponent', () => {
  let component: AvalLaboratoriaisComponent;
  let fixture: ComponentFixture<AvalLaboratoriaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvalLaboratoriaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvalLaboratoriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
