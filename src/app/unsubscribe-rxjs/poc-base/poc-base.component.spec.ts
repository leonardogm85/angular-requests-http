import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocBaseComponent } from './poc-base.component';

describe('PocBaseComponent', () => {
  let component: PocBaseComponent;
  let fixture: ComponentFixture<PocBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocBaseComponent]
    });
    fixture = TestBed.createComponent(PocBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
