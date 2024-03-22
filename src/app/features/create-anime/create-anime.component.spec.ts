import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimeComponent } from './create-anime.component';

describe('CreateAnimeComponent', () => {
  let component: CreateAnimeComponent;
  let fixture: ComponentFixture<CreateAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
