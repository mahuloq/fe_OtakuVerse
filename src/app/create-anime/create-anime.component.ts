import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}
}
