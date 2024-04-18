import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Anime } from '../../shared/models/anime';
import { AnimeService } from '../../core/services/anime.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seasonal-anime',
  standalone: true,
  imports: [RouterLink, NgClass, FormsModule],
  templateUrl: './seasonal-anime.component.html',
  styleUrl: './seasonal-anime.component.scss',
})
export class SeasonalAnimeComponent {
  animeList: Anime[] = [];
  pageNumber: number = 1;
  showFullDescription: boolean = false;
  selectedSeason: string = '';
  selectedYear: string = '';

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.loadAnime();
  }

  loadAnime(): void {
    this.animeService.filterAnimeBySeason('Fall 2023').subscribe(
      (anime: Anime[]) => {
        this.animeList = anime.map((anime) => ({ ...anime, expanded: false }));
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

  toggleDescription(index: number): void {
    this.animeList[index].expanded = !this.animeList[index].expanded;
  }

  searchBySeasonAndYear() {
    this.animeService
      .filterAnimeBySeason(this.selectedSeason + ' ' + this.selectedYear)
      .subscribe(
        (anime: Anime[]) => {
          this.animeList = anime.map((anime) => ({
            ...anime,
            expanded: false,
          }));
          console.log(this.animeList);
        },
        (error) => {
          console.error('Error fetching anime:', error);
        }
      );
  }
}
