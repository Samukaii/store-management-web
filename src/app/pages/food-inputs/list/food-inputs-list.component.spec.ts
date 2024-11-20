import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInputsListComponent } from './food-inputs-list.component';

describe('FoodInputsComponent', () => {
  let component: FoodInputsListComponent;
  let fixture: ComponentFixture<FoodInputsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodInputsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInputsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
