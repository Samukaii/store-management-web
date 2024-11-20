import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInputsUpdateComponent } from './food-inputs-update.component';

describe('FoodInputsUpdateComponent', () => {
  let component: FoodInputsUpdateComponent;
  let fixture: ComponentFixture<FoodInputsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodInputsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInputsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
