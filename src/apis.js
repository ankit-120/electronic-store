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
    return `https://node-electronic-store-backend.onrender.com/api/register`
}

export function getProfile() {
    return `https://node-electronic-store-backend.onrender.com/api/profile`
}

export function login() {
    return `https://node-electronic-store-backend.onrender.com/api/login`
}

export function logout() {
    return `https://node-electronic-store-backend.onrender.com/api/logout`
}

export function addItemToCart() {
    return `https://node-electronic-store-backend.onrender.com/api/cart/add`
}

export function getMyCart() {
    return `https://node-electronic-store-backend.onrender.com/api/cart/mycart`
}

export function deleteItemFromCart(idx) {
    return `https://node-electronic-store-backend.onrender.com/api/cart/mycart/${idx}`
}

export function deleteAllProduct() {
    return `https://node-electronic-store-backend.onrender.com/api/cart/mycart`
}
