export interface IUser {
  uid: string;
  email: string;
  password: string;
  roles: string;
  name: string;
  photoURL?: string;
  displayName?: string;
}
