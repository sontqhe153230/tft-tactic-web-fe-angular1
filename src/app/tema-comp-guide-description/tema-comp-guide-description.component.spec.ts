import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaCompGuideDescriptionComponent } from './tema-comp-guide-description.component';

describe('TemaCompGuideDescriptionComponent', () => {
  let component: TemaCompGuideDescriptionComponent;
  let fixture: ComponentFixture<TemaCompGuideDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaCompGuideDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemaCompGuideDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
