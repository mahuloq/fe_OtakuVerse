import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDetailedComponent } from './anime-detailed.component';

describe('AnimeDetailedComponent', () => {
  let component: AnimeDetailedComponent;
  let fixture: ComponentFixture<AnimeDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimeDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
