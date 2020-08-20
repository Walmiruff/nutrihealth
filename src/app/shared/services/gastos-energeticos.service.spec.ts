import { TestBed } from '@angular/core/testing';

import { GastosEnergeticosService } from './gastos-energeticos.service';

describe('GastosEnergeticosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastosEnergeticosService = TestBed.get(GastosEnergeticosService);
    expect(service).toBeTruthy();
  });
});
