import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalActionsUpdaterComponent } from './local-actions-updater.component';

describe('LocalActionsUpdaterComponent', () => {
  let component: LocalActionsUpdaterComponent;
  let fixture: ComponentFixture<LocalActionsUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalActionsUpdaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalActionsUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
