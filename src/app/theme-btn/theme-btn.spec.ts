import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBtn } from './theme-btn';

describe('ThemeBtn', () => {
  let component: ThemeBtn;
  let fixture: ComponentFixture<ThemeBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
