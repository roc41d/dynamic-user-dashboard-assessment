import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { listUsersActions } from './data-access/store/actions';
import { PageEvent } from '@angular/material/paginator';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    jest.spyOn(component['store'], 'dispatch').getMockImplementation();
    component.ngOnInit();
    expect(component['store'].dispatch).toHaveBeenCalledWith(
      listUsersActions.getUsers({ page: 1 }),
    );
  });

  it('should load users when page changes', () => {
    jest.spyOn(component['store'], 'dispatch').getMockImplementation();
    const pageEvent = { pageIndex: 2 } as PageEvent;
    component.pageChange(pageEvent);
    expect(component['currentPage']).toBe(3);
    expect(component['store'].dispatch).toHaveBeenCalledWith(
      listUsersActions.getUsers({ page: 3 }),
    );
  });
});
