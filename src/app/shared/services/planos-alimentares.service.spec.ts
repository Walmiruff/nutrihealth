import { TestBed } from '@angular/core/testing';

import { PlanosAlimentaresService } from './planos-alimentares.service';

describe('PlanosAlimentaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanosAlimentaresService = TestBed.get(PlanosAlimentaresService);
    expect(service).toBeTruthy();
  });
});
