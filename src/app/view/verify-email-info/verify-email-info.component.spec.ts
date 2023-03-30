import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailInfoComponent } from './verify-email-info.component';

describe('VerifyEmailInfoComponent', () => {
  let component: VerifyEmailInfoComponent;
  let fixture: ComponentFixture<VerifyEmailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEmailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
