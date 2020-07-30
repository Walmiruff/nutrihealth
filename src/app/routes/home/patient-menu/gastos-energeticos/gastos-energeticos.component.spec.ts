import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosEnergeticosComponent } from './gastos-energeticos.component';

describe('GastosEnergeticosComponent', () => {
  let component: GastosEnergeticosComponent;
  let fixture: ComponentFixture<GastosEnergeticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosEnergeticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosEnergeticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
