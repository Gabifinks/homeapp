import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieFilesComponent } from './lottie-files.component';

describe('LottieFilesComponent', () => {
  let component: LottieFilesComponent;
  let fixture: ComponentFixture<LottieFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottieFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottieFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
