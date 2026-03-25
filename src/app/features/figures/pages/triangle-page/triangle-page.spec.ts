import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrianglePage } from './triangle-page';

describe('TrianglePage', () => {
  let component: TrianglePage;
  let fixture: ComponentFixture<TrianglePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrianglePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrianglePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
