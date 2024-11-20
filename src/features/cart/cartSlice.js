import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   cart: [],

  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action) {
      state.cart.push(action.payload);
    },

    deletePizza(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },

    increasePizzaQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );

      pizza.quantity++;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },

    decreasePizzaQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );

      pizza.quantity--;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },

    clearCart(state) {
      state.cart = initialState;
    },
  },
});

export const {
  addPizza,
  deletePizza,
  increasePizzaQuantity,
  decreasePizzaQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;