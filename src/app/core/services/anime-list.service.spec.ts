import { TestBed } from '@angular/core/testing';

import { AnimeListService } from './anime-list.service';

describe('AnimeListService', () => {
  let service: AnimeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
