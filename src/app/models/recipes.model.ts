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

export interface Resp_edit_recipe_put {
  _id: string;
  title: string;
  description: string;
  image: string;
  published: boolean;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
