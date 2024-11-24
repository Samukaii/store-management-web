import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationsUpdateComponent } from './preparations-update.component';

describe('FoodInputsUpdateComponent', () => {
  let component: PreparationsUpdateComponent;
  let fixture: ComponentFixture<PreparationsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
