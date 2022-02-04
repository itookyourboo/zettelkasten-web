const TOKEN_KEY = 'token';
const AUTH_PREFIX = 'Bearer'

const TokenManager = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    getAuthHeader() {
        return `${AUTH_PREFIX} ${this.getToken()}`;
    },

    saveToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    deleteToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export default TokenManager;