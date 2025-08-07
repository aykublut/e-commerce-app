import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { productType, shopType, userType } from "../Types/Types";

interface appSliceType {
  products: productType[] | null;
  currentUser: userType | null;
  loading: boolean;
  currentCategory: string | null;
  currentProduct: number | null;
  inputFilter: string | any;
  shoppingItems: shopType[];
  shoppingBar: boolean;
}

const initialState: appSliceType = {
  products: null,
  currentUser: null,
  loading: false,
  currentCategory: null,
  currentProduct: null,
  inputFilter: "",
  shoppingItems: [],
  shoppingBar: false,
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLoading: (state: appSliceType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentUser: (
      state: appSliceType,
      action: PayloadAction<userType | null>
    ) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    setProducts: (state: appSliceType, action: PayloadAction<[]>) => {
      state.products = action.payload;
    },
    setCurrentCategory: (
      state: appSliceType,
      action: PayloadAction<string>
    ) => {
      state.currentCategory = action.payload;
    },
    setCurrentProduct: (state: appSliceType, action: PayloadAction<number>) => {
      state.currentProduct = action.payload;
    },
    setInputFilter: (state: appSliceType, action: PayloadAction<string>) => {
      state.inputFilter = action.payload;
    },
    setShoppingItems: (
      state: appSliceType,
      action: PayloadAction<shopType>
    ) => {
      state.shoppingItems = [...state.shoppingItems, action.payload];
    },
    setRefleshShoppingItems: (state, action) => {
      state.shoppingItems = action.payload;
    },
    //chat gptten aldım bu fonksiyonu üşendim
    setBalance: (state: appSliceType, action) => {
      if (state.currentUser && typeof state.currentUser.balance === "number") {
        state.currentUser.balance -= action.payload;
      }
    },
    //
    setShoppingBar: (state: appSliceType, action: PayloadAction<boolean>) => {
      state.shoppingBar = action.payload;
    },
  },
});

export const {
  setLoading,
  setCurrentUser,
  setProducts,
  setCurrentCategory,
  setCurrentProduct,
  setInputFilter,
  setShoppingItems,
  setBalance,
  setRefleshShoppingItems,
  setShoppingBar,
} = appSlice.actions;

export default appSlice.reducer;
