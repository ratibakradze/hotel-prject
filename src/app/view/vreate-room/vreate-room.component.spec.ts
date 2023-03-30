import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VreateRoomComponent } from './vreate-room.component';

describe('VreateRoomComponent', () => {
  let component: VreateRoomComponent;
  let fixture: ComponentFixture<VreateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VreateRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
