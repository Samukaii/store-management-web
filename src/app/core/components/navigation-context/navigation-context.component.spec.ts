import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContextComponent } from './navigation-context.component';

describe('NavigationContextComponent', () => {
  let component: NavigationContextComponent;
  let fixture: ComponentFixture<NavigationContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
