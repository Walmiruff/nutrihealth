import { TestBed } from '@angular/core/testing';

import { ModelosPlanosAlimentaresService } from './modelos-planos-alimentares.service';

describe('ModelosPlanosAlimentaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelosPlanosAlimentaresService = TestBed.get(ModelosPlanosAlimentaresService);
    expect(service).toBeTruthy();
  });
});
