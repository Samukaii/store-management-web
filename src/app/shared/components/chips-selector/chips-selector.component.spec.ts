import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsSelectorComponent } from './chips-selector.component';

describe('ChipsSelectorComponent', () => {
  let component: ChipsSelectorComponent;
  let fixture: ComponentFixture<ChipsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
