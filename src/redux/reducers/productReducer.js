import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {},
  {
    getAllProductRequest: (state, action) => {
      state.loading = true;
    },
    getAllProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    getAllProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProductRequest: (state, action) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    commentOnProductRequest: (state, action) => {
      state.commentloading = true;
    },
    commentOnProductSuccess: (state, action) => {
      state.commentloading = false;
      state.message = action.payload;
    },
    commentOnProductFail: (state, action) => {
      state.commentloading = false;
      state.error = action.payload;
    },
    likeOnProductRequest: (state, action) => {
      state.likeloading = true;
    },
    likeOnProductSuccess: (state, action) => {
      state.likeloading = false;
      state.message = action.payload;
    },
    likeOnProductFail: (state, action) => {
      state.likeloading = false;
      state.error = action.payload;
    },
    getFilterDataRequest: (state, action) => {
      state.filterloading = true;
    },
    getFilterDataSuccess: (state, action) => {
      state.loading = false;
      state.filterData = action.payload;
    },
    getFilterDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    EditProductRequest: (state, action) => {
      state.loading = true;
    },
    EditProductSuccess: (state, action) => {
      state.Editloading = false;
      state.message = action.payload;
    },
    EditProductFail: (state, action) => {
      state.Editloading = false;
      state.error = action.payload;
    },

    productRequest: (state, action) => {
      state.getproductloading = true;
    },
    productSuccess: (state, action) => {
      state.getproductloading = false;
      state.productDetail = action.payload;
    },
    productFail: (state, action) => {
      state.getproductloading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state, action) => {
      state.deleteloading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.deleteloading = false;
      state.message = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.deleteloading = false;
      state.error = action.payload;
    },

    SearchRequest: (state, action) => {
      state.searchloading = true;
    },
    SearchSuccess: (state, action) => {
      state.searchloading = false;
      state.searchItems = action.payload;
    },
    SearchFail: (state, action) => {
      state.searchloading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
