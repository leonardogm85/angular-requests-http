import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { coursesResolver } from './courses.resolver';

describe('coursesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => coursesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
