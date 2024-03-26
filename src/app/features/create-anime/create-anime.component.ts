import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GenreService } from '../../core/services/genre.service';
import { AnimeService } from '../../core/services/anime.service';
import { Genre } from '../../shared/models/genre';

@Component({
  selector: 'app-create-anime',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-anime.component.html',
  styleUrl: './create-anime.component.scss',
})
export class CreateAnimeComponent implements OnInit {
  animeForm = new FormGroup({
    english_title: new FormControl(null),
    romanji_title: new FormControl(null),
    start_air_date: new FormControl(null),
    end_air_date: new FormControl(null),
    number_of_episodes: new FormControl(null),
    description: new FormControl(null),
    season: new FormControl(null),
    studio: new FormControl(null),
    source: new FormControl(null),
    duration: new FormControl(null),
    age_rating: new FormControl(null),
    genreIds: new FormArray([]),
  });

  constructor(
    private router: Router,
    private genreService: GenreService,
    private animeService: AnimeService
  ) {}

  genres: Genre[] = [];
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.loadGenresIds();
  }

  // Use this format to add genres to anime.
  addGenreToForm() {
    (this.animeForm.get('genreIds') as FormArray).push(new FormControl(false));
  }

  loadGenresIds() {
    //send a get request to get all sports
    this.genreService.getGenres().subscribe({
      next: (genres: any) => {
        this.genres = genres;
        genres.forEach((genre: Genre) => {
          this.addGenreToForm();
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  get genreIds(): FormArray {
    return this.animeForm.get('genreIds') as FormArray;
  }

  extractGenreIds() {
    const genreIdsFormValue = this.animeForm.value.genreIds;
    const genreIds = genreIdsFormValue!
      .map((checked: boolean, i: number) => {
        return checked ? this.genres[i].id : null;
      })
      .filter((id: any) => {
        return id !== null;
      });

    return genreIds;
  }

  onCreateAnime() {
    const genreIds = this.extractGenreIds();

    const formData: any = new FormData();

    formData.append(
      'english_title',
      this.animeForm.get('english_title')!.value
    );
    formData.append(
      'romanji_title',
      this.animeForm.get('romanji_title')!.value
    );
    formData.append(
      'number_of_episodes',
      this.animeForm.get('number_of_episodes')!.value
    );
    formData.append(
      'start_air_date',
      this.animeForm.get('start_air_date')!.value
    );
    formData.append('end_air_date', this.animeForm.get('end_air_date')!.value);
    formData.append('description', this.animeForm.get('description')!.value);
    formData.append('season', this.animeForm.get('season')!.value);
    formData.append('studio', this.animeForm.get('studio')!.value);
    formData.append('source', this.animeForm.get('source')!.value);
    formData.append('duration', this.animeForm.get('duration')!.value);
    formData.append('age_rating', this.animeForm.get('age_rating')!.value);
    genreIds.forEach((genreId: any) => {
      formData.append('genre_ids[]', genreId);
    });
    formData.append('cover_image', this.selectedFile, this.selectedFile!.name);

    this.animeService.createAnime(formData).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onFileSelected(anime: any) {
    if (anime.target.files && anime.target.files[0]) {
      this.selectedFile = anime.target.files[0];
    }
  }
}
