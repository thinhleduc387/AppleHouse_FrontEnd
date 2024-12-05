export const ROUTERS = {
  USER: {
    HOME: "",
    LOGIN: "/login",
    PRODUCTS: "/products", // Trang danh sách tất cả các sản phẩm
    PRODUCT_DETAIL: (productId = ":productId") => `/products/${productId}`, // Trang chi tiết sản phẩm
    CART: "/cart", // Giỏ hàng
    PROFILE: "/profile",
    
    // Trang danh mục cho từng loại sản phẩm
    IPHONE: "/products/iphone", // Trang danh sách các sản phẩm iPhone
    MAC: "/products/mac", // Trang danh sách các sản phẩm Mac (bao gồm MacBook, iMac, v.v.)
    IPAD: "/products/ipad", // Trang danh sách các sản phẩm iPad
    APPLE_WATCH: "/products/apple-watch", // Trang danh sách các sản phẩm Apple Watch
    AUDIO: "/products/audio", // Trang danh sách các sản phẩm Tai nghe và loa
    ACCESSORIES: "/products/accessories", // Trang danh sách các phụ kiện
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    MANAGE_PRODUCTS: "/admin/products",
    ADD_PRODUCT: "/admin/products/add",
    STOCK: "/admin/stock",
    ORDER: "/admin/order",
    EDIT_PRODUCT: (productId = ":productId") => `/admin/products/edit/${productId}`,
  },
};
