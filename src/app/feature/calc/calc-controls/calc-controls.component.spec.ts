import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcControlsComponent } from './calc-controls.component';

describe('CalcControlsComponent', () => {
  let component: CalcControlsComponent;
  let fixture: ComponentFixture<CalcControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcControlsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
