import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosAlimentaresComponent } from './planos-alimentares.component';

describe('PlanosAlimentaresComponent', () => {
  let component: PlanosAlimentaresComponent;
  let fixture: ComponentFixture<PlanosAlimentaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanosAlimentaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanosAlimentaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
