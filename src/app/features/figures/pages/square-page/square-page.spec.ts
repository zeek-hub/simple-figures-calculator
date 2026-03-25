import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarePage } from './square-page';

describe('SquarePage', () => {
  let component: SquarePage;
  let fixture: ComponentFixture<SquarePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquarePage],
    }).compileComponents();

    fixture = TestBed.createComponent(SquarePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
