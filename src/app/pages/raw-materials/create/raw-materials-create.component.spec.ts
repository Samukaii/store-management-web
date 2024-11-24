import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCreateComponent } from './raw-materials-create.component';

describe('FoodInputsCreateComponent', () => {
  let component: RawMaterialsCreateComponent;
  let fixture: ComponentFixture<RawMaterialsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
