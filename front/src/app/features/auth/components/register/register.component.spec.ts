import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: { register: jest.Mock };
  let routerMock: { navigate: jest.Mock };

  beforeEach(async () => {
    authServiceMock = {
      register: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Min and max validators', () => {

    it('should mark firstName as invalid if shorter than 3 characters', () => {
      const control = component.form.get('firstName');
      control?.setValue('Jo');

      expect(control?.valid).toBe(false);
      expect(control?.errors).toMatchObject({ min: expect.any(Object) });
    });

    it('should mark firstName as invalid if longer than 20 characters', () => {
      const control = component.form.get('firstName');
      control?.setValue('ThisNameIsWayTooLongToBeAccepted');

      expect(control?.valid).toBe(false);
      expect(control?.errors).toMatchObject({ max: expect.any(Object) });
    });

    it('should mark lastName as invalid if shorter than 3 characters', () => {
      const control = component.form.get('lastName');
      control?.setValue('Te');

      expect(control?.valid).toBe(false);
      expect(control?.errors).toMatchObject({ min: expect.any(Object) });
    });

    it('should mark lastName as invalid if longer than 20 characters', () => {
      const control = component.form.get('lastName');
      control?.setValue('ThisNameIsWayTooLongToBeAccepted');

      expect(control?.valid).toBe(false);
      expect(control?.errors).toMatchObject({ max: expect.any(Object) });
    })
  });

  describe('Form validity for required fields', () => {
    it('should have an invalid form initially', () => {
      expect(component.form.valid).toBeFalsy();
    });
    it('should be valid when all fields are correctly filled', () => {
      component.form.setValue({
        email: 'test@mail.com',
        firstName: 'Firstname',
        lastName: 'Lastname',
        password: 'Password123',
      });
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('Service is called', () => {
    it('should call authService.register and navigate to login on success', () => {
      const mockData = {
        email: 'test@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'securePassword123',
      };

      component.form.setValue(mockData);
      authServiceMock.register.mockReturnValue(of(undefined));

      component.submit();

      expect(authServiceMock.register).toHaveBeenCalledWith(mockData);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should set onError to true when register fails', () => {
      const mockData = {
        email: 'fail@example.com',
        firstName: 'Bob',
        lastName: 'Jones',
        password: '12345'
      };
    
      component.form.setValue(mockData);
    
      // Simulate error
      authServiceMock.register.mockReturnValue(throwError(() => new Error('registration failed')));
    
      component.submit();
    
      expect(component.onError).toBe(true);
    });
  })

});
