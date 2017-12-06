import { TestBed, inject } from '@angular/core/testing';

import { PocsService } from './pocs.service';

describe('PocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PocsService]
    });
  });

  it('should be created', inject([PocsService], (service: PocsService) => {
    expect(service).toBeTruthy();
  }));
});
