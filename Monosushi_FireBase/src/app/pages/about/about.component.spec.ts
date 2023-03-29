import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let q = [
    {
      h2: 'Скільки часу очікувати на замовлення?',
      p1: 'Час доставки залежить від адреси замовлення.',
      p2: 'Доставка в зелену зону – до 1 год.',
      p3: 'Доставка в жовту зону – до 1,5 год.',
      ask: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create "question" array', () => {
    expect(component.question).toBeDefined();
    expect(component.question.length).toBeGreaterThan(0);
  });
});
