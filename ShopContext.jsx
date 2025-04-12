import { createContext } from "react";
import { products } from "../assets/assets.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Rs.';
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);

    // Load cartItems from localStorage on initial render
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    // Load wishlistItems from localStorage on initial render
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlistItems");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save cartItems and wishlistItems to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Add item to cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    // Remove item from cart
    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];

            // Remove product entry if no sizes remain
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

            setCartItems(cartData);
        }
    };

    // Update cart item quantity
    const updateCartItem = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
        }
    };

    // Add item to wishlist
    const addToWishlist = (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        const alreadyInWishlist = wishlistItems.some(item => item.id === itemId && item.size === size);
        if (alreadyInWishlist) {
            toast.info('Item is already in wishlist');
            return;
        }

        const product = products.find(p => p.id === itemId);
        if (product) {
            setWishlistItems((prevWishlist) => [
                ...prevWishlist,
                { ...product, size }
            ]);
        }
    };

    // Remove item from wishlist
    const removeFromWishlist = (itemId, size) => {
        setWishlistItems((prevWishlist) =>
            prevWishlist.filter(item => !(item.id === itemId && item.size === size))
        );
    };

    // Get total count of items in cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                try {
                    if (cartItems[items][size] > 0) {
                        totalCount += cartItems[items][size];
                    }
                } catch (error) {
                    console.error("Error while counting cart items:", error);
                }
            }
        }
        return totalCount;
    };

    // Get total count of items in wishlist
    const getWishlistCount = () => {
        return wishlistItems.length;
    };

    // Debugging cart and wishlist updates
    useEffect(() => {
        console.log("Cart updated:", cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log("Wishlist updated:", wishlistItems);
    }, [wishlistItems]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        getCartCount,
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        removeFromWishlist,
        getWishlistCount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;