import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfChatsComponent } from './list-of-chats.component';

describe('ListOfChatsComponent', () => {
  let component: ListOfChatsComponent;
  let fixture: ComponentFixture<ListOfChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
