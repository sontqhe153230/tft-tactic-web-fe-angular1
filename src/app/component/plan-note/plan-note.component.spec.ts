import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNoteComponent } from './plan-note.component';

describe('PlanNoteComponent', () => {
  let component: PlanNoteComponent;
  let fixture: ComponentFixture<PlanNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
