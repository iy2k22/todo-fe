import { TestBed } from '@angular/core/testing';

import { ThemeSvc } from './theme-svc';

describe('ThemeSvc', () => {
  let service: ThemeSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
