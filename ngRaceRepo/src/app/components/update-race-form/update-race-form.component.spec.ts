import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRaceFormComponent } from './update-race-form.component';

describe('UpdateRaceFormComponent', () => {
  let component: UpdateRaceFormComponent;
  let fixture: ComponentFixture<UpdateRaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRaceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
