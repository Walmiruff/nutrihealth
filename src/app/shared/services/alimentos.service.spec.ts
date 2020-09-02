import { TestBed } from '@angular/core/testing';

import { AlimentosService } from './alimentos.service';

describe('AlimentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlimentosService = TestBed.get(AlimentosService);
    expect(service).toBeTruthy();
  });
});
