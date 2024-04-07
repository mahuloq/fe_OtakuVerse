import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CastService } from '../../core/services/cast.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PersonSearchService } from '../../core/services/person-search.service';
import { Person } from '../../shared/models/person';

@Component({
  selector: 'app-cast-creation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cast-creation.component.html',
  styleUrl: './cast-creation.component.scss',
})
export class CastCreationComponent implements OnInit {
  animeId: number = 0;
  searchResults: Person[] = [];

  castForm = new FormGroup({
    person_id: new FormControl(0),
    person_name: new FormControl(''),
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

        switchMap((name) => this.personSearch.searchByName(name!))
      )
      .subscribe(
        (response: Person[]) => {
          // Search results here
          this.searchResults = response;

          // Will display a dropdown of matches, allowing person to pick the correct person.

          // Will update person_id with data
        },
        (error) => {
          console.error('Error:', error);
          // Handle error if any
        }
      );
  }

  selectPerson(person: Person) {
    this.castForm.patchValue({
      person_id: person.id,
      person_name: `${person.first_name} ${person.last_name}`,
    });
    console.log(person.id);
    console.log(person);
    this.searchResults = [];
  }

  onCreateCrew() {
    // on submit do this
    this.castService.createCast(this.castForm);
  }
}
