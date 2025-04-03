import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionApiService } from '../../services/session-api.service'; 

import { ListComponent } from './list.component';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';


const mockSessions: Session[] = [
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

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockSessionService: jest.Mocked<SessionApiService>;

  beforeEach(async () => {
    const sessionServiceMock = {
      findAll: jest.fn()
    };
    
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule],
      providers: [{ provide: SessionApiService, useValue: sessionServiceMock }]
    }).compileComponents();

    mockSessionService = TestBed.inject(SessionApiService) as jest.Mocked<SessionApiService>;
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    mockSessionService.all.mockReturnValue(of(mockSessions));
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('Should get all sessions', () => {
    component.sessions$.subscribe(sessions => {
      expect(sessions).toEqual(mockSessions);
    });
  });

  // test case for empty list
  it('should handle empty session list', () => {
    // Reset mock to return empty array
    mockSessionService.all.mockReturnValue(of([]));

    // Recreate component with new mock
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.sessions$.subscribe(sessions => {
      expect(sessions.length).toBe(0);
    });
  });
});
