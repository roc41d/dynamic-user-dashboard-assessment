import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { UserDetailsComponent } from './user-details.component';
import { userDetailActions } from './data-access/store/actions';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        provideMockStore({ }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getUserDetails action on ngOnInit', () => {
    const userId = parseInt(route.snapshot.paramMap.get('id')!, 10);
    jest.spyOn(component['store'], 'dispatch').getMockImplementation();
    component.ngOnInit();
    expect(component['store'].dispatch).toHaveBeenCalledWith(
      userDetailActions.getUserDetails({ userId })
    );
  });
});