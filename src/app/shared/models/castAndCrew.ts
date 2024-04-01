import { Person } from './person';

export class CastAndCrew {
  id: number;
  character: string;
  role: string;
  person: Person;

  constructor(castAndCrewData: any) {
    this.id = castAndCrewData.id || 0;
    this.character = castAndCrewData.character || '';
    this.role = castAndCrewData.role || '';
    this.person = new Person(castAndCrewData.person || {});
  }
}
