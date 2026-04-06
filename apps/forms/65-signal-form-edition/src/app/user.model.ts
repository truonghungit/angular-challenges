export interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  grade: number;
}

export type EditingUser = Omit<User, 'id'>;
