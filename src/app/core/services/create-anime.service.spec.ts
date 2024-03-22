import { TestBed } from '@angular/core/testing';

import { CreateAnimeService } from './anime.service';

describe('CreateAnimeService', () => {
  let service: CreateAnimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAnimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
