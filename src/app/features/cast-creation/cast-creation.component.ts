import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CastService } from '../../core/services/cast.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PersonSearchService } from '../../core/services/person-search.service';

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
    person_name: new FormControl(null),
    anime_id: new FormControl(0),
    role: new FormControl(null),
    character: new FormControl(null),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private castService: CastService,
    private personSearch: PersonSearchService
  ) {}

  ngOnInit(): void {
    this.animeId = +this.route.snapshot.params['id'];

    this.castForm.patchValue({
      anime_id: this.animeId,
    });

    this.castForm
      .get('person_name')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((personName) => this.personSearch.searchByName(personName!))
      )
      .subscribe(
        (response) => {
          // Handle search results here
          console.log('Search results:', response);
          // Update UI to display search results or suggestions
        },
        (error) => {
          console.error('Error:', error);
          // Handle error if any
        }
      );
  }

  onCreateCrew() {
    // Implement creation logic here, including using person_id from the form
  }
}
