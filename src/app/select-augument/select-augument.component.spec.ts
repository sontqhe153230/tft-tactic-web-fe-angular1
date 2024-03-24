import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAugumentComponent } from './select-augument.component';

describe('SelectAugumentComponent', () => {
  let component: SelectAugumentComponent;
  let fixture: ComponentFixture<SelectAugumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAugumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectAugumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
