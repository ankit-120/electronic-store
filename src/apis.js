export function getProducts() {
    return 'https://dummyjson.com/products?limit=20';
}

export function getCategories() {
    return 'https://dummyjson.com/products/categories';
}

export function getProduct(id) {
    return `https://dummyjson.com/products/${id}`
}

export function getFeaturedProduct(limit) {
    return `https://dummyjson.com/products?limit=${limit}&skip=3`
}

export function register() {
    return `http://localhost:5000/api/register`
}

export function getProfile() {
    return `http://localhost:5000/api/profile`
}

export function login() {
    return `http://localhost:5000/api/login`
}

export function logout() {
    return `http://localhost:5000/api/logout`
}