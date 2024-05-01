const API_URL = "https://recetly.net/api/v1/" //Agregar despues app/api, cuando todas las rutas esten bien definidas

const ENDPOINTS = {
    AuthUser: 'auth/login',
    PostComment: (recipeId, userId) => `recipe/post/comment/${recipeId}/${userId}`
}

export {
    API_URL,
    ENDPOINTS
}