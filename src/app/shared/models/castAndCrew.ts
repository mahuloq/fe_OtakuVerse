import { Person } from './person';

export class CastAndCrew {
  id: number;
  character: string;
  role: string;
  person?: Person;
  person_id?: number;
  anime_id?: number;

  constructor(castAndCrewData: any) {
    this.id = castAndCrewData.id || 0;
    this.character = castAndCrewData.character || '';
    this.role = castAndCrewData.role || '';
    this.person = new Person(castAndCrewData.person || {});
    this.person_id = castAndCrewData.person_id;
    this.anime_id = castAndCrewData.anime_id;
  }
}
