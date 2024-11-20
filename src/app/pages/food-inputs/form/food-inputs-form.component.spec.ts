import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInputsFormComponent } from './food-inputs-form.component';

describe('FoodInputsFormComponent', () => {
  let component: FoodInputsFormComponent;
  let fixture: ComponentFixture<FoodInputsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodInputsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInputsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
