import { cartModel } from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
// ✅ get active cart
export const getActiveCart = async ({ userId, populate }) => {
    let cart;
    if (populate) {
        await cartModel
            .findOne({ userId, status: "active" })
            .populate("items.product");
    }
    cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await cartModel.create({
            userId,
            items: [],
            totalPrice: 0,
            status: "active",
        });
    }
    return cart;
};
// ✅ add item
export const addItemToCart = async ({ userId, productId, quantity, }) => {
    try {
        if (!productId || !quantity || quantity <= 0) {
            return { message: "Invalid input", statusCode: 400 };
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return { message: "Product not found", statusCode: 404 };
        }
        const cart = await getActiveCart({ userId });
        // نشوف المنتج موجود ولا لا
        const existingItem = cart.items.find((item) => item.product.toString() === productId.toString());
        // لو موجود نزود الكمية
        if (existingItem) {
            existingItem.quantity += quantity;
            // نتأكد ان الكمية متعدتش ال stock
            if (existingItem.quantity > product.stock) {
                return {
                    message: "Insufficient stock",
                    statusCode: 400,
                };
            }
        }
        else {
            // لو مش موجود نضيفه
            cart.items.push({
                product: productId,
                quantity,
                unitPrice: product.price,
                title: product.title,
                imageUrl: product.image,
            });
        }
        // نحسب التوتال
        cart.totalPrice = cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
        await cart.save();
        return {
            data: await getActiveCart({
                userId,
                populate: true,
            }),
            message: "Product added to cart",
            statusCode: 200,
        };
    }
    catch (err) {
        console.error("Add to cart error:", err);
        return {
            message: "Server error",
            statusCode: 500,
        };
    }
};
export const updateCartItem = async ({ userId, productId, quantity, }) => {
    const cart = await getActiveCart({ userId });
    const exist = cart.items.find((p) => p.product.toString() === productId.toString());
    if (!exist) {
        return {
            message: "Product not in cart",
            statusCode: 404,
        };
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return {
            message: "Product not found",
            statusCode: 404,
        };
    }
    if (product.stock < quantity) {
        return {
            message: "Insufficient stock",
            statusCode: 400,
        };
    }
    // تحديث الكمية
    exist.quantity = quantity;
    // إعادة حساب التوتال بالكامل
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
    }, 0);
    await cart.save();
    return {
        data: await getActiveCart({
            userId,
            populate: true,
        }),
        message: "Cart item updated",
        statusCode: 200,
    };
};
export const removeCartItem = async ({ userId, productId, }) => {
    const cart = await getActiveCart({ userId });
    const exist = cart.items.find((p) => p.product.toString() === productId.toString());
    if (!exist) {
        return {
            message: "Product not in cart",
            statusCode: 404,
        };
    }
    // حذف المنتج
    cart.items = cart.items.filter((p) => p.product.toString() !== productId.toString());
    // إعادة حساب التوتال
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
    }, 0);
    await cart.save();
    return {
        data: await getActiveCart({
            userId,
            populate: true,
        }),
        message: "Cart item removed",
        statusCode: 200,
    };
};
export const clearCart = async ({ userId }) => {
    const cart = await getActiveCart({ userId });
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    return {
        data: await getActiveCart({ userId, populate: true }),
        message: "Cart cleared",
        statusCode: 200,
    };
};
export const checkoutCart = async ({ userId, address }) => {
    const cart = await getActiveCart({ userId });
    const orderItems = [];
    for (const item of cart.items) {
        const product = await productModel.findById(item.product);
        if (!product) {
            return {
                message: `Product with id ${item.product} not found`,
                statusCode: 404,
            };
        }
        const orderItem = {
            productTitle: product.title || "",
            productImage: product.image || "",
            price: item.unitPrice,
            quantity: item.quantity,
        };
        orderItems.push(orderItem);
    }
    const order = await orderModel.create({
        orderItems,
        totalPrice: cart.totalPrice,
        address,
        userId,
    });
    await order.save();
    cart.status = "completed";
    await cart.save();
    return {
        data: order,
        message: "Checkout successful",
        statusCode: 200,
    };
};
//# sourceMappingURL=cartServices.js.map