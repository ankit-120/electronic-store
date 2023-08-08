export function getProducts() {
    // return 'https://dummyjson.com/products?limit=20';
    return `${import.meta.env.VITE_URL}/api/product`;
}

export function getCategories() {
    return `${import.meta.env.VITE_URL}/api/product/categories`;
}

export function getBrands() {
    return `${import.meta.env.VITE_URL}/api/product/brands`;
}

export function getProduct(id) {
    return `${import.meta.env.VITE_URL}/api/product/${id}`;
}

export function getFeaturedProduct(limit) {
    return `https://dummyjson.com/products?limit=${limit}&skip=3`;
}

export function register() {
    return `${import.meta.env.VITE_URL}/api/register`;
}

export function getProfile() {
    return `${import.meta.env.VITE_URL}/api/profile`;
}

export function login() {
    return `${import.meta.env.VITE_URL}/api/login`;
}

export function logout() {
    return `${import.meta.env.VITE_URL}/api/logout`;
}

export function addItemToCart() {
    return `${import.meta.env.VITE_URL}/api/cart/add`;
}

export function getMyCart() {
    return `${import.meta.env.VITE_URL}/api/cart/mycart`;
}

export function deleteItemFromCart(idx) {
    return `${import.meta.env.VITE_URL}/api/cart/mycart/${idx}`;
}

export function deleteAllProduct() {
    return `${import.meta.env.VITE_URL}/api/cart/mycart`;
}

export function addProduct() {
    return `${import.meta.env.VITE_URL}/api/product/add`;
}
