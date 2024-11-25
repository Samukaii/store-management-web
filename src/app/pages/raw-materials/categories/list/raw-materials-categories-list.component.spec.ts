import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCategoriesListComponent } from './raw-materials-categories-list.component';

describe('FoodInputsComponent', () => {
  let component: RawMaterialsCategoriesListComponent;
  let fixture: ComponentFixture<RawMaterialsCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCategoriesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
