import { TestBed } from '@angular/core/testing';

import { ProfleService } from './profle.service';

describe('ProfleService', () => {
  let service: ProfleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
