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