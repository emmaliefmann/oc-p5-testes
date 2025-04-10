import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [SessionService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Password visibility toggle', () => {
    it('should toggle visibility', () => {
      const passwordInput = fixture.nativeElement.querySelector(`[data-testid="password"]`);
      const toggleButton = fixture.nativeElement.querySelector(`[data-testid="password-visibility"]`);

      // hidden by default
      expect(passwordInput.type).toBe('password');
      toggleButton.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      // becomes visible after click
      expect(passwordInput.type).toBe('text');

      fixture.detectChanges();
      // Should be hidden again
      toggleButton.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(passwordInput.type).toBe('password');
    });
    // submit should be disabled if field empty
    describe('Disable and enable submit button', () => {
      it('should disable submit button with empty field', () => {
        // why fail to find?
        const submitButton = fixture.nativeElement.querySelector(`[data-testid="submit"]`);
        expect(submitButton.disabled).toBe(true);
      });
      it('should enable submit button when fields completed', () => {
        const passwordInput = fixture.nativeElement.querySelector(`[data-testid="password"]`);
        const emailInput = fixture.nativeElement.querySelector(`[data-testid="email"]`);
        const submitButton = fixture.nativeElement.querySelector(`[data-testid="submit"]`);
        emailInput.value = 'test@example.com';
        emailInput.dispatchEvent(new Event('input'));
        passwordInput.value = 'password123';
        passwordInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(submitButton.disabled).toBe(false);
      })
    })
  })
});
