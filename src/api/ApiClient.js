const API_BASE_URL = "https://recipes-api-dev.koyeb.app/api/v1/" //Agregar despues app/api, cuando todas las rutas esten bien definidas

const ENDPOINTS = {
    AuthUser: 'user/auth/login',
    PostNewUser: 'user/auth/register',
    GetUserData: (id) => `user/get-data/${id}`,
    AddFavorite: (userId, recipeId) => `user/add/favorite/${userId}/recipe/${recipeId}`, // Modificar, no es la ruta
    GetRecipe: (id) => `recipe/get/${id}`,
    GetRecipeCard: (id) => `recipe/get/${id}/basic`,
    CalificateRecipe: (score, userId, recipeId) => `recipe/add/score/${score}/${userId}/recipe/${recipeId}`,
    GetRecipesByCategory: (cat) => `recipe/get/category/${cat}`,
    Daily: `recipe/get/daily`,
    RemoveFavorite: (userId, recipeId) => `user/remove/favorite/${userId}/recipe/${recipeId}`,
    GetRecipesBasic: `recipe/get/all/basic`,
    CheckRecipeFavorite: (userId, recipeId) => `user/check/favorite/${userId}/recipe/${recipeId}`,
    GetUserScores: (userId) => `user/get/score/${userId}`,
    GetRecipeScore: (recipeId) => `recipe/get/score/${recipeId}`
}

export {
    API_BASE_URL,
    ENDPOINTS
}