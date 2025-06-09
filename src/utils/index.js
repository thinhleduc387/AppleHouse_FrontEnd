export const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
};

export const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return `${interval} năm trước`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} tháng trước`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} ngày trước`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} giờ trước`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} phút trước`;
    }

    return "Vừa xong";
};

const NOTIFICATION_TYPES = {
    // Order related
    ORDER_PLACED: 'ORDER_PLACED',
    ORDER_CONFIRMED: 'ORDER_CONFIRMED',
    ORDER_PROCESSING: 'ORDER_PROCESSING',
    ORDER_SHIPPED: 'ORDER_SHIPPED',
    ORDER_DELIVERED: 'ORDER_DELIVERED',
    ORDER_CANCELLED: 'ORDER_CANCELLED',
    ORDER_REFUNDED: 'ORDER_REFUNDED',

    // Payment related
    PAYMENT_PENDING: 'PAYMENT_PENDING',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_FAILED: 'PAYMENT_FAILED',

    // Product related
    PRICE_DROP: 'PRICE_DROP',
    BACK_IN_STOCK: 'BACK_IN_STOCK',
    PRODUCT_REVIEW: 'PRODUCT_REVIEW',

    // Promotion related
    DISCOUNT_RECEIVED: 'DISCOUNT_RECEIVED',
    DISCOUNT_EXPIRING: 'DISCOUNT_EXPIRING',
    PROMOTION_START: 'PROMOTION_START',

    // Account related
    ACCOUNT_CREDIT: 'ACCOUNT_CREDIT',
    REWARD_EARNED: 'REWARD_EARNED',
    LEVEL_UP: 'LEVEL_UP',

    //INFORM 
    INFORM: "INFORM"
};

export const NOTIFICATION_IMG = {
    // Order related
    [NOTIFICATION_TYPES.ORDER_PLACED]: '',
    [NOTIFICATION_TYPES.ORDER_CONFIRMED]: 'Đơn hàng của bạn đã được xác nhận',
    [NOTIFICATION_TYPES.ORDER_PROCESSING]: 'Đơn hàng của bạn đang được xử lý',
    [NOTIFICATION_TYPES.ORDER_SHIPPED]: 'Đơn hàng của bạn đang được vận chuyển',
    [NOTIFICATION_TYPES.ORDER_DELIVERED]: 'Đơn hàng của bạn đã được giao thành công',
    [NOTIFICATION_TYPES.ORDER_CANCELLED]: 'Đơn hàng của bạn đã bị hủy',
    [NOTIFICATION_TYPES.ORDER_REFUNDED]: 'Đơn hàng của bạn đã được hoàn tiền',

    // Payment related
    [NOTIFICATION_TYPES.PAYMENT_PENDING]: 'Vui lòng hoàn tất thanh toán cho đơn hàng của bạn',
    [NOTIFICATION_TYPES.PAYMENT_SUCCESS]: 'Thanh toán đơn hàng thành công',
    [NOTIFICATION_TYPES.PAYMENT_FAILED]: 'Thanh toán đơn hàng thất bại',

    // Product related
    [NOTIFICATION_TYPES.PRICE_DROP]: 'Sản phẩm trong danh sách yêu thích của bạn đã giảm giá',
    [NOTIFICATION_TYPES.BACK_IN_STOCK]: 'Sản phẩm bạn quan tâm đã có hàng trở lại',
    [NOTIFICATION_TYPES.PRODUCT_REVIEW]: 'Cảm ơn bạn đã đánh giá sản phẩm',

    // Promotion related
    [NOTIFICATION_TYPES.DISCOUNT_RECEIVED]: 'Bạn vừa nhận được một mã giảm giá mới',
    [NOTIFICATION_TYPES.DISCOUNT_EXPIRING]: 'Mã giảm giá của bạn sắp hết hạn',
    [NOTIFICATION_TYPES.PROMOTION_START]: 'Chương trình khuyến mãi mới đang chờ bạn',

    // Account related
    [NOTIFICATION_TYPES.ACCOUNT_CREDIT]: 'Tài khoản của bạn vừa được cộng điểm thưởng',
    [NOTIFICATION_TYPES.REWARD_EARNED]: 'Chúc mừng bạn đã đạt được phần thưởng mới',
    [NOTIFICATION_TYPES.LEVEL_UP]: 'Chúc mừng bạn đã thăng hạng thành viên'
};