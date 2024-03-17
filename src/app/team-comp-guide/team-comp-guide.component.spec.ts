import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCompGuideComponent } from './team-comp-guide.component';

describe('TeamCompGuideComponent', () => {
  let component: TeamCompGuideComponent;
  let fixture: ComponentFixture<TeamCompGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCompGuideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamCompGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
