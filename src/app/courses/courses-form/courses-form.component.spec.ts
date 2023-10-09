import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFormComponent } from './courses-form.component';

describe('CoursesFormComponent', () => {
  let component: CoursesFormComponent;
  let fixture: ComponentFixture<CoursesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesFormComponent]
    });
    fixture = TestBed.createComponent(CoursesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
