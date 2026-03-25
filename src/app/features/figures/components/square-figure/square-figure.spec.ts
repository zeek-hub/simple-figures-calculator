import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareFigure } from './square-figure';

describe('SquareFigure', () => {
  let component: SquareFigure;
  let fixture: ComponentFixture<SquareFigure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareFigure],
    }).compileComponents();

    fixture = TestBed.createComponent(SquareFigure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
