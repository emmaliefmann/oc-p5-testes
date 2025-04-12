import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;

  
  beforeEach(() => {
    service = new SessionService();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should start as logged out', (done) => {
    service.$isLogged().subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });
  
  
  const mockUser: SessionInformation = {
    username: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    token: 'abc123',
    type: '',
    id: 1,
    admin: false
  };
  it('should log in the user and emit true', (done) => {
    service.logIn(mockUser);

    expect(service.isLogged).toBe(true);
    expect(service.sessionInformation).toEqual(mockUser);

    service.$isLogged().subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should log out the user and emit false', (done) => {
    service.logIn(mockUser);
    service.logOut();

    expect(service.isLogged).toBe(false);
    expect(service.sessionInformation).toBeUndefined();

    service.$isLogged().subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });
});
