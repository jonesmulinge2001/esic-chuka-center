import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatnersComponent } from './patners.component';

describe('PatnersComponent', () => {
  let component: PatnersComponent;
  let fixture: ComponentFixture<PatnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
