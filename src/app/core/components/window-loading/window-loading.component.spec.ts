import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowLoadingComponent } from './window-loading.component';

describe('WindowLoadingComponent', () => {
  let component: WindowLoadingComponent;
  let fixture: ComponentFixture<WindowLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
