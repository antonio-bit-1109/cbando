export interface Iuser {
  name: string;
  email: string;
  password: string;
  note: string;
  role?: string;
}

export interface IUserDetail {
  createdAt: string;

  email: string;

  name: string;

  note: string;

  password: string;

  preferite: string[];

  role: string;

  updatedAt: string;

  __v: number;

  _id: string;
}
