import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareForm } from './square-form';

describe('SquareForm', () => {
  let component: SquareForm;
  let fixture: ComponentFixture<SquareForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SquareForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
