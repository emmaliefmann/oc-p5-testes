import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Session } from '../interfaces/session.interface';

const mockApiSessions: Session[] = [
  {
    id: 1,
    name: 'Yoga Flow',
    description: 'Relaxing yoga session',
    date: new Date('2024-06-15T10:00:00Z'),
    teacher_id: 101,
    users: [1, 2, 3],
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z')
  },
  {
    id: 2,
    name: 'Power Yoga',
    description: 'Intense yoga workout',
    date: new Date('2024-06-16T18:00:00Z'),
    teacher_id: 102,
    users: [4, 5],
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-04T00:00:00Z')
  }
];

const pathService = 'api/session';

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpMock: HttpTestingController;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
      
    });
    service = TestBed.inject(SessionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should retrieve sessions', () => {
    service.all().subscribe(sessions => {
      expect(sessions).toEqual(mockApiSessions);
    })
    const req = httpMock.expectOne('api/session');  // Replace with your actual endpoint
  expect(req.request.method).toBe('GET');

  req.flush(mockApiSessions);
  httpMock.verify();
  })

  it('should retrieve session details by id', () => {
    const mockSession: Session = {
      id: 1,
      name: 'Yoga Flow',
      description: 'Relaxing yoga session',
      date: new Date('2024-06-15T10:00:00Z'),
      teacher_id: 101,
      users: [1, 2, 3],
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-02T00:00:00Z')
    };
    
    const sessionId = '1';

    service.detail(sessionId).subscribe(session => {
      expect(session).toEqual(mockSession); 
    });
    const req = httpMock.expectOne(`${pathService}/${sessionId}`);
    expect(req.request.method).toBe('GET');  
    req.flush(mockSession);
    httpMock.verify();
  });

  it('should create a new session', () => {
    const mockSession: Session = {
      name: 'Yoga Flow',
      description: 'Relaxing yoga session',
      date: new Date('2024-06-15T10:00:00Z'),
      teacher_id: 101,
      users: [1, 2, 3],
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-02T00:00:00Z')
    };

    service.create(mockSession).subscribe(session => {
      expect(session).toEqual(mockSession);  
    });

    const req = httpMock.expectOne(pathService);
    expect(req.request.method).toBe('POST');  

    req.flush(mockSession);
    httpMock.verify();
  });

  it('should update an existing session', () => {
    const updatedSession: Session = {
      id: 1,
      name: 'Yoga Flow',
      description: 'Relaxing yoga session updated',
      date: new Date('2024-06-15T10:00:00Z'),
      teacher_id: 101,
      users: [1, 2, 3],
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-02T00:00:00Z')
    };

    // Call the service method with the updated session
    service.update(updatedSession.id!.toString(), updatedSession).subscribe(session => {
      expect(session).toEqual(updatedSession);  // Ensure the response matches the updated session
    });


    const req = httpMock.expectOne(`${pathService}/${updatedSession.id}`);
    expect(req.request.method).toBe('PUT');  // Ensure the request method is PUT

    req.flush(updatedSession);

    httpMock.verify();
  });

  it('should participate in a session', () => {
    const sessionId = '1';
    const userId = '101';
  
    service.participate(sessionId, userId).subscribe(response => {
      expect(response).toBeUndefined();
    });
  
    const req = httpMock.expectOne(`${pathService}/${sessionId}/participate/${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  
    httpMock.verify();
  });
});
