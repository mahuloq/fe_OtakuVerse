import { ProfileUser } from './profileUser';

export class Profile {
  id: number;
  bio: string;
  profile_photo_url: string;
  favorites: string;
  user: ProfileUser;

  constructor(profileData: any) {
    this.id = profileData.id || 0;
    this.bio = profileData.bio || '';
    this.profile_photo_url = profileData.profile_photo_url;
    this.favorites = profileData.favorites;
    this.user = profileData.user;
  }
}
