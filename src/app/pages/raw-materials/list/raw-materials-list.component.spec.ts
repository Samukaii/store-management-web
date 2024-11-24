import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsListComponent } from './raw-materials-list.component';

describe('FoodInputsComponent', () => {
  let component: RawMaterialsListComponent;
  let fixture: ComponentFixture<RawMaterialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
