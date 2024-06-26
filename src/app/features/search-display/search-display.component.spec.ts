import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDisplayComponent } from './search-display.component';

describe('SearchDisplayComponent', () => {
  let component: SearchDisplayComponent;
  let fixture: ComponentFixture<SearchDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
