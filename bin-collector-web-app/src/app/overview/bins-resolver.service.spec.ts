import { TestBed } from '@angular/core/testing';

import { BinsResolverService } from './bins-resolver.service';

describe('BinsResolverService', () => {
  let service: BinsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
