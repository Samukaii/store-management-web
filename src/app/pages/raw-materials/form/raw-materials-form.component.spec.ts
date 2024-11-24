import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsFormComponent } from './raw-materials-form.component';

describe('FoodInputsFormComponent', () => {
  let component: RawMaterialsFormComponent;
  let fixture: ComponentFixture<RawMaterialsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
