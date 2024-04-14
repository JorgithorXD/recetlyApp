const API_BASE_URL = "https://recipes-api-dev.koyeb.app/api/v1/" //Agregar despues app/api, cuando todas las rutas esten bien definidas

const ENDPOINTS = {
    AuthUser: 'user/auth/login',
    PostNewUser: 'user/auth/register',
    GetUserData: (id) => `user/get-data/${id}`,
    AddFavorite: (userId, recipeId) => `user/favorite/add/${userId}/recipe/${recipeId}`, // Modificar, no es la ruta
    GetRecipe: (id) => `recipe/get/${id}`
}

export {
    API_BASE_URL,
    ENDPOINTS
}