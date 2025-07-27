import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
