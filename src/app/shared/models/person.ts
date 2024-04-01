export class Person {
  id: number;
  first_name: string;
  last_name: string;
  language: string;
  bio: string;
  birthday: string;
  website: string;
  alternate_names: string;
  more: string;

  constructor(personData: any) {
    this.id = personData.id || 0;
    this.first_name = personData.first_name || '';
    this.last_name = personData.last_name || '';
    this.language = personData.language || '';
    this.bio = personData.bio || '';
    this.birthday = personData.birthday || '';
    this.website = personData.website || '';
    this.alternate_names = personData.alternate_names || '';
    this.more = personData.more || '';
  }

  // Method to check if the person has additional information
  hasMoreInfo(): boolean {
    return !!this.more;
  }
}
