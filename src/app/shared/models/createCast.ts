export class CreateCast {
  character: string;
  role: string;
  person_id: number;
  anime_id: number;
  id?: number;

  constructor(castAndCrewData: any) {
    this.character = castAndCrewData.character || '';
    this.role = castAndCrewData.role || '';
    this.person_id = castAndCrewData.person_id;
    this.anime_id = castAndCrewData.anime_id;
    this.id = castAndCrewData.id;
  }
}
