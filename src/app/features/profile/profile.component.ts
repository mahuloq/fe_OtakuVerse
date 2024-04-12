import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../shared/models/profile';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: Profile = new Profile({
    id: 0,
    user: {},
    bio: '',
    profile_photo_url: '',
    favorites: '',
  });

  profileUsername: string = '';

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const usernameParam = this.route.snapshot.paramMap.get('username');
    this.profileUsername = usernameParam!.replace(/\./g, '%2E');
    console.log(usernameParam);
    console.log(`The encoded username is ${this.profileUsername}`);
    this.profileService
      .getProfile(this.profileUsername)
      .subscribe((profile) => {
        this.profile = profile;
      });
  }
  deleteMe(anime: any) {
    this.profileService.removeAnimeFromList(anime).subscribe();
    console.log('Deleted');
  }
}
