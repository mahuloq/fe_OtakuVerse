import { Component, OnInit } from '@angular/core';
import { Anime } from '../../shared/models/anime';
import { AnimeService } from '../../core/services/anime.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-anime',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-anime.component.html',
  styleUrl: './top-anime.component.scss',
})
export class TopAnimeComponent implements OnInit {
  animeList: Anime[] = [];
  pageNumber: number = 1;

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.loadAnime();
  }

  loadAnime(): void {
    this.animeService.getAnimes().subscribe(
      (anime: Anime[]) => {
        this.animeList = anime;
        console.log(this.animeList);
      },
      (error) => {
        console.error('Error fetching anime:', error);
      }
    );
  }

  hyphenateUrlParams(str: string) {
    // Replace parentheses and other special characters with an empty string
    return str.replace(/[()':]/g, '').replace(/ /g, '-');
  }
}
