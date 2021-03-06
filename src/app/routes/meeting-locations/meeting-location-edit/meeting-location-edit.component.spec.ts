import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingLocationEditComponent } from './meeting-location-edit.component';

describe('MeetingLocationEditComponent', () => {
  let component: MeetingLocationEditComponent;
  let fixture: ComponentFixture<MeetingLocationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingLocationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
