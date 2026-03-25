import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleForm } from './triangle-form';

describe('TriangleForm', () => {
  let component: TriangleForm;
  let fixture: ComponentFixture<TriangleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriangleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TriangleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
