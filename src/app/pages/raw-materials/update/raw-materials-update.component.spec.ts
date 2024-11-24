import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsUpdateComponent } from './raw-materials-update.component';

describe('FoodInputsUpdateComponent', () => {
  let component: RawMaterialsUpdateComponent;
  let fixture: ComponentFixture<RawMaterialsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
