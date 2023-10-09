import { TestBed } from '@angular/core/testing';

import { EmitValueService } from './emit-value.service';

describe('EmitValueService', () => {
  let service: EmitValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
