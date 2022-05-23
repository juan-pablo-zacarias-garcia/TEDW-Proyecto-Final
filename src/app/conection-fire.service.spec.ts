import { TestBed } from '@angular/core/testing';

import { ConectionFireService } from './conection-fire.service';

describe('ConectionFireService', () => {
  let service: ConectionFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectionFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
