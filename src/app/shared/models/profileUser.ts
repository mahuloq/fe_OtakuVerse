import { AnimeLists } from './animeLists';

export class ProfileUser {
  id: number;
  username: string;
  anime_lists: AnimeLists;

  constructor(profileData: any) {
    this.id = profileData.id || 0;
    this.username = profileData.username || '';
    this.anime_lists = new AnimeLists(profileData.anime_lists || {});
  }
}
