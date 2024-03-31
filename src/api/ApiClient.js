const API_BASE_URL = "https://recipes-api-dev.koyeb.app/" //Agregar despues app/api, cuando todas las rutas esten bien definidas

const ENDPOINTS = {
    AuthUser: 'user/auth/v1/login',
    PostNewUser: 'user/auth/v2/register',
    GetUserData: (id) => `user/get-data/${id}`
}

export {
    API_BASE_URL,
    ENDPOINTS
}