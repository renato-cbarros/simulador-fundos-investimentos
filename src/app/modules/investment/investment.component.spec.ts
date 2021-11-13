import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentComponent } from './investment.component';

describe('InvestmentComponent', () => {
  let component: InvestmentComponent;
  let fixture: ComponentFixture<InvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
