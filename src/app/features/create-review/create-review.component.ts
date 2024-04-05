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
  selector: 'app-create-review',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.scss',
})
export class CreateReviewComponent implements OnInit {
  animeId: number = 0;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  reviewForm = new FormGroup({
    content: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    recommend: new FormControl('recommend', Validators.required),
    anime_id: new FormControl(0),
  });

  ngOnInit(): void {
    this.animeId = +this.route.snapshot.params['id'];

    this.reviewForm.patchValue({
      anime_id: this.animeId,
    });
  }

  onSubmitReview() {
    const newReview = new Review(this.reviewForm.value);

    this.reviewService.submitReview(newReview).subscribe({
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
