import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AugumentsComponent } from './auguments.component';

describe('AugumentsComponent', () => {
  let component: AugumentsComponent;
  let fixture: ComponentFixture<AugumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AugumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AugumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
