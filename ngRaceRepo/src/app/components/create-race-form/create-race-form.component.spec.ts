import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaceFormComponent } from './create-race-form.component';

describe('CreateRaceFormComponent', () => {
  let component: CreateRaceFormComponent;
  let fixture: ComponentFixture<CreateRaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRaceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
