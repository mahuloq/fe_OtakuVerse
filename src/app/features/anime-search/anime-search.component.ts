import { Component, OnInit } from '@angular/core';
import { Genre } from '../../shared/models/genre';
import { RouterLink } from '@angular/router';
import { Anime } from '../../shared/models/anime';
import { GenreService } from '../../core/services/genre.service';
import { AnimeService } from '../../core/services/anime.service';
import { NgClass } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnimeSearch } from '../../shared/models/animeSearch';

@Component({
  selector: 'app-anime-search',
  standalone: true,
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  templateUrl: './anime-search.component.html',
  styleUrl: './anime-search.component.scss',
})
export class AnimeSearchComponent implements OnInit {
  genres: Genre[] = [];
  animes: Anime[] = [];
  searchResults: AnimeSearch[] = [];
  selectedLetter: string = '';
  selecteGenreId: number = 0;
  selectedGenre: Genre = {
    id: 0,
    name: '',
    description: '',
  };

  searchType: string = '';
  selectedSeason: string = '';
  alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  searchActive: boolean = false;

  searchForm = new FormGroup({
    id: new FormControl(0),
    english_title: new FormControl(''),
    romanji_title: new FormControl(''),
    start_air_date: new FormControl(''),
    end_air_date: new FormControl(''),
    number_of_episodes: new FormControl(0),
    description: new FormControl(''),
    cover_photo_url: new FormControl(''),
  });

  constructor(
    private genreService: GenreService,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this.genreService.getGenresWithAnimeCount().subscribe({
      next: (genres: Genre[]) => {
        this.genres = genres;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.searchForm
      .get('english_title')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),

        switchMap((name) => this.animeService.searchByName(name!))
      )
      .subscribe({
        next: (response: AnimeSearch[]) => {
          this.searchResults = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  generateSeasons(): string[] {
    const currentYear = new Date().getFullYear();
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    const currentMonth = new Date().getMonth() + 1; // Adding 1 since getMonth() returns zero-based index

    const result: string[] = [];

    // Iterate through two years: current, previous
    for (let year = currentYear - 1; year <= currentYear; year++) {
      // Loop through seasons
      for (const season of seasons) {
        // Add the season to the result
        result.push(`${season} ${year}`);
      }
    }

    return result;
  }

  seasons: string[] = this.generateSeasons();

  selectLetter(letter: string) {
    if (this.selectedLetter == letter) {
      this.searchActive = false;
      this.selectedLetter = '';
      this.animes = [];
      return;
    }

    this.selectedLetter = letter;
    this.searchType = 'letter';
    this.selectedGenre = {
      id: 0,
      name: '',
      description: '',
    };
    this.filterAnimeByLetter(letter);
  }

  filterAnimeByLetter(letter: string) {
    this.animeService.filterAnimeByFirstLetter(letter).subscribe({
      next: (animes: Anime[]) => {
        this.animes = animes;
        this.searchActive = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selectGenre(genre: Genre) {
    this.selecteGenreId = genre.id;
    this.selectedGenre = genre;
    this.searchType = 'genre';

    console.log(this.selecteGenreId);
    this.genreService.filterGenreByName(this.selecteGenreId).subscribe({
      next: (animes: Anime[]) => {
        this.animes = animes;
        this.searchActive = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selectSeason(season: string) {
    this.selectedSeason = season;
    this.searchType = 'season';

    console.log(this.selectedSeason);
    this.animeService.filterAnimeBySeason(season).subscribe({
      next: (animes: Anime[]) => {
        this.animes = animes;
        this.searchActive = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  hyphenateUrlParams(str: string) {
    return str.replace(/[()':]/g, '').replace(/ /g, '-');
  }

  genreReturn() {
    this.animes = [];
    this.selectedGenre = {
      id: 0,
      name: '',
      description: '',
    };
    this.searchType = '';
    this.searchActive = false;
  }

  seasonReturn() {
    this.animes = [];
    this.searchType = '';
    this.searchActive = false;
  }
}
