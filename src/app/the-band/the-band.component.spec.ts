import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBandComponent } from './the-band.component';

describe('TheBandComponent', () => {
  let component: TheBandComponent;
  let fixture: ComponentFixture<TheBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
