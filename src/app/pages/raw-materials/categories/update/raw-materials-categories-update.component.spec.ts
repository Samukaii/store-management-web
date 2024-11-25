import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCategoriesUpdateComponent } from './raw-materials-categories-update.component';

describe('FoodInputsUpdateComponent', () => {
  let component: RawMaterialsCategoriesUpdateComponent;
  let fixture: ComponentFixture<RawMaterialsCategoriesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCategoriesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCategoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
