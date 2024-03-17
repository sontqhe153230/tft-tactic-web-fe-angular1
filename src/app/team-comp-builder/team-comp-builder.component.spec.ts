import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCompBuilderComponent } from './team-comp-builder.component';

describe('TeamCompBuilderComponent', () => {
  let component: TeamCompBuilderComponent;
  let fixture: ComponentFixture<TeamCompBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCompBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamCompBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
