import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalActionsComponent } from './local-actions.component';

describe('LocalActionsComponent', () => {
  let component: LocalActionsComponent;
  let fixture: ComponentFixture<LocalActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
