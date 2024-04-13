import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CastService } from '../../core/services/cast.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PersonSearchService } from '../../core/services/person-search.service';
import { Person } from '../../shared/models/person';
import { CreateCast } from '../../shared/models/createCast';
import { CastAndCrew } from '../../shared/models/castAndCrew';

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
  castCrew: CastAndCrew[] = [];
  editMode: boolean = false;

  castForm = new FormGroup({
    id: new FormControl(0),
    person_id: new FormControl(0),
    person_name: new FormControl(''),
    anime_id: new FormControl(0),
    role: new FormControl(''),
    character: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private castService: CastService,
    private personSearch: PersonSearchService
  ) {}

  ngOnInit(): void {
    this.animeId = +this.route.snapshot.params['id'];

    this.castService.getFullCrew(this.animeId).subscribe({
      next: (castAndCrew: CastAndCrew[]) => {
        this.castCrew = castAndCrew;
      },
      error: (error) => {
        console.log(error);
      },
    });

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
      .subscribe({
        next: (response: Person[]) => {
          this.searchResults = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
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

    if (this.editMode) {
      const castAndCrewData = {
        id: this.castForm.get('id')?.value,
        person_id: this.castForm.get('person_id')?.value,
        anime_id: this.castForm.get('anime_id')?.value,
        role: this.castForm.get('role')?.value,
        character: this.castForm.get('character')?.value,
      };
      console.log(castAndCrewData);
      const updateCast = new CreateCast(castAndCrewData);
      console.log(updateCast);
      this.updateCrew(updateCast);
    } else {
      const castAndCrewData = {
        person_id: this.castForm.get('person_id')?.value,
        anime_id: this.castForm.get('anime_id')?.value,
        role: this.castForm.get('role')?.value,
        character: this.castForm.get('character')?.value,
      };

      const newCast = new CreateCast(castAndCrewData);
      this.castService.createCast(newCast).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/anime', this.animeId]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  editCrew(cast: CastAndCrew) {
    this.castForm.patchValue({
      id: cast.id,
      person_id: cast.person_id,
      person_name: `${cast.person!.first_name} ${cast.person!.last_name}`,
      role: cast.role,
      character: cast.character,
    });
    console.log(cast);
    console.log(this.castForm.value.id);
    this.editMode = true;
  }

  cancelEdit() {
    this.castForm.patchValue({
      person_id: 0,
      person_name: '',
      role: '',
      character: '',
    });
    this.editMode = false;
  }

  updateCrew(newCast: CreateCast) {
    this.castService.updateCast(newCast).subscribe({
      next: (data) => {},
      error: (error) => {
        console.log(error);
      },
    });

    setTimeout(() => {
      this.castService.getFullCrew(this.animeId).subscribe({
        next: (castAndCrew: CastAndCrew[]) => {
          this.castCrew = castAndCrew;
          this.castForm.patchValue({
            person_id: 0,
            person_name: '',
            role: '',
            character: '',
          });
          this.editMode = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }, 100);
  }
}
