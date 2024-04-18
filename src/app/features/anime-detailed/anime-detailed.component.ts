import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimeService } from '../../core/services/anime.service';
import { Anime } from '../../shared/models/anime';
import { AuthenticationService } from '../auth/services/authentication.service';
import { ReviewService } from '../../core/services/review.service';
import { Review } from '../../shared/models/review';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AnimeListService } from '../../core/services/anime-list.service';
import { AnimeLists } from '../../shared/models/animeLists';

@Component({
  selector: 'app-anime-detailed',
  standalone: true,
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  templateUrl: './anime-detailed.component.html',
  styleUrl: './anime-detailed.component.scss',
})
export class AnimeDetailedComponent implements OnInit {
  isInList: boolean = false;
  animeId: number = 0;
  animeName: string = '';

  animeListForm = new FormGroup({
    anime_id: new FormControl(0),
    score: new FormControl(0),
    episodes_watched: new FormControl(0),
    list_type: new FormControl('plan_to_watch'),
  });

  animeList: AnimeLists = new AnimeLists({
    id: 0,
    anime_id: 0,
    episodes_watched: 0,
    list_type: '',
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
    reviews: [],
    cover_photo_url: '',
  });

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private authService: AuthenticationService,
    private reviewService: ReviewService,
    private animeListService: AnimeListService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.animeId = idParam ? +idParam : 0;
    this.animeName = this.route.snapshot.paramMap.get('name') || '';
    this.animeListForm.patchValue({
      anime_id: this.animeId,
    });

    this.animeListService.getUserAnimeList(this.animeId).subscribe({
      next: (animeList: AnimeLists) => {
        if (animeList) {
          // If animeList exists, update the form values and set isInList to true
          this.animeListForm.patchValue({
            anime_id: animeList.anime_id,
            score: animeList.score,
            episodes_watched: animeList.episodes_watched,
            list_type: animeList.list_type,
          });
          this.isInList = true;
          console.log('Anime List Exists');
        } else {
          // If animeList does not exist, set isInList to false
          this.isInList = false;
          console.log('Anime List Does not Exist');
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this.animeService.getAnime(this.animeId).subscribe((anime) => {
      this.anime = anime;
    });

    this.animeListForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.updateAnimeList();
    });
  }

  allowedDelete(reviewUser: string): boolean {
    const user = this.authService.getUserFromLocalStorage();

    if (user?.username == 'Admin' || user?.username == reviewUser) {
      return true;
    } else {
      return false;
    }
  }

  deleteReview(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );
    if (confirmed) {
      this.reviewService.deleteReview(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  toggleDescription(review: Review): void {
    review.expanded = !review.expanded;
  }

  addToMyList() {
    if (!this.isInList) {
      const animeListData: any = {
        anime_id: this.animeId,
      };

      // Check if form control values exist and add them to the anime list data
      const score = this.animeListForm.get('score')?.value;
      if (score !== null && score !== undefined) {
        animeListData.score = score;
      }

      const episodesWatched = this.animeListForm.get('episodes_watched')?.value;
      if (episodesWatched !== null && episodesWatched !== undefined) {
        animeListData.episodes_watched = episodesWatched;
      }

      const listType = this.animeListForm.get('list_type')?.value;
      if (listType !== null && listType !== undefined) {
        animeListData.list_type = listType;
      }

      // Create anime list with the data collected
      this.animeListService.createAnimeList(animeListData).subscribe({
        next: (response) => {
          console.log('Anime List Created', response);
          this.isInList = true;
        },
        error: (error) => {
          console.log('Error creating anime list:', error);
        },
      });
    } else {
      console.log('Anime already in list');
    }
  }

  updateAnimeList() {
    if (this.isInList === true) {
      console.log('Anime List Updated');
    } else this.addToMyList();
  }
}
