import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatNavComponent } from './float-nav.component';

describe('FloatNavComponent', () => {
  let component: FloatNavComponent;
  let fixture: ComponentFixture<FloatNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
