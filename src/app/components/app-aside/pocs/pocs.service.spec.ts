import { TestBed, inject } from '@angular/core/testing';

import { PocsService } from './pocs.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PocsService]
    });
  });

  it('should be created', inject([PocsService], (service: PocsService) => {
    expect(service).toBeTruthy();
  }));
});
