import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocUnsubscribeComponent } from './poc-unsubscribe.component';

describe('PocUnsubscribeComponent', () => {
  let component: PocUnsubscribeComponent;
  let fixture: ComponentFixture<PocUnsubscribeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocUnsubscribeComponent]
    });
    fixture = TestBed.createComponent(PocUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
