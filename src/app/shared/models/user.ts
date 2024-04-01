export class User {
  id: number;
  username: string;
  email: string;

  constructor(userData: any) {
    this.id = userData.id || 0;
    this.username = userData.username || '';
    this.email = userData.email || '';
  }
}
