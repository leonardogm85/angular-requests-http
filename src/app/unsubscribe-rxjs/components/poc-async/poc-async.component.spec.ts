import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocAsyncComponent } from './poc-async.component';

describe('PocAsyncComponent', () => {
  let component: PocAsyncComponent;
  let fixture: ComponentFixture<PocAsyncComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocAsyncComponent]
    });
    fixture = TestBed.createComponent(PocAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
