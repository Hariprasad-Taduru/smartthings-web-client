import { TestBed } from '@angular/core/testing';

import { StClientService } from './st-client.service';

describe('StClientService', () => {
  let service: StClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
