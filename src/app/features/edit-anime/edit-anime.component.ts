import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../../core/services/anime.service';
import { Anime } from '../../shared/models/anime';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Genre } from '../../shared/models/genre';
import { GenreService } from '../../core/services/genre.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-edit-anime',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-anime.component.html',
  styleUrl: './edit-anime.component.scss',
})
export class EditAnimeComponent implements OnInit {
  @ViewChild('descriptionTextArea') descriptionTextArea!: ElementRef;

  searchResults: Genre[] = [];

  genreForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
  });

  animeForm = new FormGroup({
    english_title: new FormControl(''),
    romanji_title: new FormControl(''),
    start_air_date: new FormControl(''),
    end_air_date: new FormControl(''),
    number_of_episodes: new FormControl(0),
    description: new FormControl(''),
    season: new FormControl(''),
    studio: new FormControl(''),
    source: new FormControl(''),
    duration: new FormControl(0),
    age_rating: new FormControl(''),
    genres: new FormArray<FormGroup>([]),
  });

  anime: Anime = new Anime({
    english_title: '',
    romanji_title: '',
    start_air_date: '',
    end_air_date: '',
    number_of_episodes: 0,
    description: '',
    season: '',
    studio: '',
    source: '',
    duration: '',
    age_rating: '',
    genres: [],
    cover_photo_url: '',
  });

  animeId: number = 0;
  animeName: string = '';
  genres: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private genreService: GenreService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.animeId = idParam ? +idParam : 0;
    this.animeName = this.route.snapshot.paramMap.get('name') || '';

    this.animeService.getAnime(this.animeId).subscribe((anime) => {
      this.anime = anime;

      this.animeForm.patchValue({
        english_title: anime.english_title,
        romanji_title: anime.romanji_title,
        start_air_date: anime.start_air_date,
        end_air_date: anime.end_air_date,
        number_of_episodes: anime.number_of_episodes,
        description: anime.description,
        season: anime.season,
        studio: anime.studio,
        source: anime.source,
        duration: anime.duration,
        age_rating: anime.age_rating,
      });

      anime.genres.forEach((genre: Genre) => {
        (this.animeForm.get('genres') as FormArray).push(
          new FormGroup({
            id: new FormControl(genre.id),
            name: new FormControl(genre.name),
          })
        );
      });

      this.adjustTextAreaHeight();
    });

    this.genreForm
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),

        switchMap((name) => this.genreService.searchByName(name!))
      )
      .subscribe({
        next: (response: Genre[]) => {
          this.searchResults = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onUpdateAnime() {
    const updatedAnime = new Anime(this.animeForm.value);
    const genreIds = this.animeForm.value.genres!.map(
      (genre: Genre) => genre.id
    );

    updatedAnime.genre_ids = genreIds;

    this.animeService.updateAnime(updatedAnime, this.animeId).subscribe({
      next: (data) => {
        this.router.navigate(['/anime', this.animeId]);
      },
      error: (error) => {},
    });
  }

  // after search, adds genre to form group
  onAddGenre(genre: Genre) {
    (this.animeForm.get('genres') as FormArray).push(
      new FormGroup({
        id: new FormControl(genre.id),
        name: new FormControl(genre.name),
      })
    );
    this.searchResults = [];
    this.genreForm.patchValue({
      id: 0,
      name: '',
    });
  }
  //  Removes genre on click
  removeGenre(index: number) {
    this.animeForm.controls.genres.removeAt(index);
    console.log(this.animeForm.controls.genres.value);
  }
  // Adjusts height of description text box
  adjustTextAreaHeight() {
    const textArea = this.descriptionTextArea.nativeElement;
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  deleteAnime() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this anime?'
    );
    if (confirmed) {
      this.animeService.deleteAnime(this.animeId).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  isAdmin(): boolean {
    const user = this.authService.getUserFromLocalStorage();

    if (user?.username == 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
