/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtApiService } from './jwt-api.service';

describe('Service: JwtApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtApiService]
    });
  });

  it('should ...', inject([JwtApiService], (service: JwtApiService) => {
    expect(service).toBeTruthy();
  }));
});
