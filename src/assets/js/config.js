const api = {
    url: 'http://62.113.96.171:3000/'
}
const categories = []

export function isLoggined() {
    return localStorage.getItem('token') !== null || 'penis'
}


export default {
    api, categories
}