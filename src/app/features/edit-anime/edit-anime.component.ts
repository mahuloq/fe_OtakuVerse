import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-edit-anime',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-anime.component.html',
  styleUrl: './edit-anime.component.scss',
})
export class EditAnimeComponent implements OnInit {
  @ViewChild('descriptionTextArea') descriptionTextArea!: ElementRef;

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
    genres: new FormArray([
      new FormGroup({ id: new FormControl(123), name: new FormControl('') }),
    ]),
    // genres: new FormArray([]),
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
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.animeId = idParam ? +idParam : 0;
    this.animeName = this.route.snapshot.paramMap.get('name') || '';

    this.animeService.getAnime(this.animeId).subscribe((anime) => {
      this.anime = { ...anime };

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
  }

  onUpdateAnime() {}

  adjustTextAreaHeight() {
    const textArea = this.descriptionTextArea.nativeElement;
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  removeGenre(genre: any | undefined | null) {
    // if (genre != undefined && genre != null) {

    // }
    console.log(genre);
  }
}
