export interface IRecipe {
  _id: number;
  title: string;
  description: string;
  image: string;
  difficulty: number;
  createdAt: string;
  published: boolean;
}

export interface IPostRecipe {
  title: string;
  description: string;
  image: string;
  published: boolean;
  difficulty: number;
}
