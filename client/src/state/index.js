import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },

        addToCart: (state, action) => {
            if (state.cart.length === 0) {
                state.cart = [...state.cart, action.payload.item]
            } else {
                const itemIndex = state.cart.findIndex(
                    (item) => item.id === action.payload.item.id
                )
                if (itemIndex === -1) {
                    state.cart = [...state.cart, action.payload.item]
                }
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            )
        },

        increaseCount: (state, action) => {
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            )
            state.cart[itemIndex] = {
                ...state.cart[itemIndex],
                count: state.cart[itemIndex].count + 1,
            }
        },

        decreaseCount: (state, action) => {
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            )
            const oldCount = state.cart[itemIndex].count
            const newCount = oldCount > 1 ? oldCount - 1 : oldCount
            state.cart[itemIndex] = {
                ...state.cart[itemIndex],
                count: newCount,
            }
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen
        },
    },
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions

export default cartSlice.reducer
