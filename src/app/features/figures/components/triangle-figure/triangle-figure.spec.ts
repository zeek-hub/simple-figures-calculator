import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleFigure } from './triangle-figure';

describe('TriangleFigure', () => {
  let component: TriangleFigure;
  let fixture: ComponentFixture<TriangleFigure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriangleFigure],
    }).compileComponents();

    fixture = TestBed.createComponent(TriangleFigure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
