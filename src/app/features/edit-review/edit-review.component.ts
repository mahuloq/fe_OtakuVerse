import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ReviewService } from '../../core/services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../shared/models/review';

@Component({
  selector: 'app-edit-review',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.scss',
})
export class EditReviewComponent implements OnInit {
  animeId: number = 0;
  reviewId: number = 0;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  reviewForm = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    recommend: new FormControl('recommend', Validators.required),
    anime_id: new FormControl(0),
  });

  ngOnInit(): void {
    this.animeId = +this.route.snapshot.params['id'];
    this.reviewId = +this.route.snapshot.params['reviewId'];

    this.reviewService.showReview(this.reviewId).subscribe({
      next: (data: Review) => {
        this.reviewForm.patchValue({
          content: data.content,
          recommend: data.recommend,
          anime_id: data.anime_id,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.reviewForm.patchValue({
      anime_id: this.animeId,
    });
  }

  onSubmitReview() {
    const newReview = new Review(this.reviewForm.value);

    this.reviewService.updateReview(newReview, this.reviewId).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/anime', this.animeId]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
