import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCategoriesCreateComponent } from './raw-materials-categories-create.component';

describe('FoodInputsCreateComponent', () => {
  let component: RawMaterialsCategoriesCreateComponent;
  let fixture: ComponentFixture<RawMaterialsCategoriesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCategoriesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
