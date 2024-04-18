import { Component, OnInit } from '@angular/core';
import { Anime } from '../../shared/models/anime';
import { AnimeService } from '../../core/services/anime.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  animeList: Anime[] = [];
  pageNumber: number = 1;
  randomList: Anime[] = [];

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.loadAnime();
  }

  loadAnime(): void {
    this.animeService.getAnimes().subscribe(
      (anime: Anime[]) => {
        this.animeList = anime;
        console.log(this.animeList);
        this.pickRandomAnime();
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

  pickRandomAnime() {
    const indexArray = new Set<number>();

    console.log('random ran');

    // Keep selecting random indices until we have 4 unique ones
    while (indexArray.size < 4) {
      const randomIndex = Math.floor(Math.random() * this.animeList.length);
      indexArray.add(randomIndex);
    }
    console.log(indexArray);
    // Convert the set to an array
    const uniqueIndices = Array.from(indexArray);

    // Retrieve the anime objects corresponding to the unique indices
    this.randomList = uniqueIndices.map((index) => this.animeList[index]);

    console.log(this.randomList);
  }
}
