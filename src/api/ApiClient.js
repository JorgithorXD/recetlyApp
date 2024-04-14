const API_BASE_URL = "https://recipes-api-dev.koyeb.app/api/v1/" //Agregar despues app/api, cuando todas las rutas esten bien definidas

const ENDPOINTS = {
    AuthUser: 'user/auth/login',
    PostNewUser: 'user/auth/register',
    GetUserData: (id) => `user/get-data/${id}`,
    AddFavorite: (userId, recipeId) => `user/add/favorite/${userId}/recipe/${recipeId}`, // Modificar, no es la ruta
    GetRecipe: (id) => `recipe/get/${id}`,
    CalificateRecipe: (score, userId, recipeId) => `recipe/add/score/${score}/${userId}/recipe/${recipeId}`
}

export {
    API_BASE_URL,
    ENDPOINTS
}