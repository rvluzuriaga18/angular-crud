import { TestBed } from '@angular/core/testing';
import { CustomerSharedService } from './customer.shared.service';

describe('Customer.SharedService', () => {
  let service: CustomerSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
