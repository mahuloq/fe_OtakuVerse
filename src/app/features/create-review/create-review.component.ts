import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../auth/services/authentication.service';
import { ReviewService } from '../../core/services/review-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.scss',
})
export class CreateReviewComponent implements OnInit {
  animeId: number = 0;
  currentUser: User | null = null;

  constructor(
    private authService: AuthenticationService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  reviewForm = new FormGroup({
    content: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    recommend: new FormControl('recommend', Validators.required),
  });

  ngOnInit(): void {
    this.animeId = this.route.snapshot.params['id'];
    this.currentUser = this.authService.getUserFromLocalStorage();
  }

  onSubmitReview() {}
}
