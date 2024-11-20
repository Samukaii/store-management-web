import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInputsCreateComponent } from './food-inputs-create.component';

describe('FoodInputsCreateComponent', () => {
  let component: FoodInputsCreateComponent;
  let fixture: ComponentFixture<FoodInputsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodInputsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInputsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
