export type RecipeData = {
    id:          string;
    owner:       string;
    name:        string;
    description: null | string;
    mainImg:     string;
    addedAt:     Date;
    tag:         Category;
    category:    Category;
    time:        Time;
    ingredients: Ingredients;
    steps:       Steps;
}

export type Category = {
    count: number;
    tags:  Tag[];
}

export type Tag = {
    key:   number;
    value: string;
}

export type Ingredients = {
    count:       number;
    ingredients: Ingredient[];
}

export type Ingredient = {
    name:   string;
    amount: number;
    unit:   Tag;
}

export type Steps = {
    count: number;
    steps: string[];
}

export type Time = {
    from: string;
    to:   string;
}
