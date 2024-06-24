import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users', () => {
    const page = 1;
    const mockResponse = { data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };

    service.getUsers(page).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['userUrl']}?page=${page}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a user', () => {
    const id = 1;
    const mockResponse = { data: { id: 1, name: 'John' } };

    service.getUser(id).subscribe(response => {
      expect(response).toEqual(mockResponse.data);
    });

    const req = httpMock.expectOne(`${service['userUrl']}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
