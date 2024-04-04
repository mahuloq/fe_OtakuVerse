import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastCreationComponent } from './cast-creation.component';

describe('CastCreationComponent', () => {
  let component: CastCreationComponent;
  let fixture: ComponentFixture<CastCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
