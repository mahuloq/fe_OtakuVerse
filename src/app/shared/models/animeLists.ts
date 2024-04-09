export class AnimeLists {
  anime_id: number;
  user_id: number;
  list_type: string;
  start_date: string;
  end_date: string;
  episodes_watched: number;

  constructor(animeList: any) {
    this.anime_id = animeList.anime_id;
    this.user_id = animeList.user_id;
    this.list_type = animeList.list_type;
    this.start_date = animeList.start_date;
    this.end_date = animeList.end_date;
    this.episodes_watched = animeList.episodes_watched;
  }
}

// constructor(profileData: any) {
//   this.anime_id = profileData.user.anime_lists.anime_id;
//   this.user_id = profileData.user.anime_lists.user_id;
//   this.list_type = profileData.user.anime_lists.list_type;
//   this.start_date = profileData.user.anime_lists.start_date;
//   this.end_date = profileData.user.anime_lists.end_date;
//   this.episodes_watched = profileData.user.anime_lists.episodes_watched;
// }
