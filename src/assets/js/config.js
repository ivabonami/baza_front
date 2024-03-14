const api = {
    url: 'http://62.113.96.171:3000/'
}
export function isLoggined() {
    return localStorage.getItem('token') !== null;
}
export default {
    api
}