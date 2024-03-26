import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../core/services/anime.service';
import { Anime } from '../../shared/models/anime';

@Component({
  selector: 'app-anime-detailed',
  standalone: true,
  imports: [],
  templateUrl: './anime-detailed.component.html',
  styleUrl: './anime-detailed.component.scss',
})
export class AnimeDetailedComponent implements OnInit {
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
    cover_photo: '',
  });

  animeId: number = 0;
  animeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.animeId = idParam ? +idParam : 0;
    this.animeName = this.route.snapshot.paramMap.get('name') || '';

    this.animeService.getAnime(this.animeId).subscribe((anime) => {
      this.anime = { ...anime };
    });
  }
}
