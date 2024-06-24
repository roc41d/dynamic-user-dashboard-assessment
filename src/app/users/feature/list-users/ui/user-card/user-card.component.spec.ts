import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../../interfaces/user';
import { ActivatedRoute } from '@angular/router';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a user input', () => {
    const mockUser: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    component.user = mockUser;
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('mat-card');
    expect(cardElement).toBeTruthy();

    const nameElement = cardElement.querySelector('.mat-mdc-card-title');
    expect(nameElement.textContent).toContain(
      `${mockUser.first_name} ${mockUser.last_name}`,
    );

    const emailElement = cardElement.querySelector('.mat-mdc-card-subtitle');
    expect(emailElement.textContent).toContain(mockUser.email);
  });

  it('should not render if user input is not provided', () => {
    expect(() => fixture.detectChanges()).toThrowError("Cannot read properties of undefined (reading 'id')");
  });
});
