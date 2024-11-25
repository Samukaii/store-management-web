import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCategoriesFormComponent } from './raw-materials-categories-form.component';

describe('FoodInputsFormComponent', () => {
  let component: RawMaterialsCategoriesFormComponent;
  let fixture: ComponentFixture<RawMaterialsCategoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCategoriesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
