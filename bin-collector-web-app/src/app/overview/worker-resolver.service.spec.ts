import { TestBed } from '@angular/core/testing';

import { WorkerResolverService } from './worker-resolver.service';

describe('WorkerResolverService', () => {
  let service: WorkerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
