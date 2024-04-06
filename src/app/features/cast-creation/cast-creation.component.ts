import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CastService } from '../../core/services/cast.service';

@Component({
  selector: 'app-cast-creation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cast-creation.component.html',
  styleUrl: './cast-creation.component.scss',
})
export class CastCreationComponent implements OnInit {
  animeId: number = 0;

  castForm = new FormGroup({
    person_id: new FormControl(null),
    anime_id: new FormControl(0),
    role: new FormControl(null),
    character: new FormControl(null),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private castService: CastService
  ) {}

  ngOnInit(): void {
    this.animeId = +this.route.snapshot.params['id'];

    this.castForm.patchValue({
      anime_id: this.animeId,
    });
  }

  onCreateCrew() {}
}
