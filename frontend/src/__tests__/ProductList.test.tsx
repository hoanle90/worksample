import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList"; 
import { Product } from "../types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice"; 


const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];


const store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

describe("ProductList", () => {
  it("renders the correct number of ProductCard components", () => {
    render(
      <Provider store={store}>
        <ProductList products={mockProducts} />
      </Provider>
    );

    
    const productCards = screen.getAllByTestId("product-card") 
    
   
    expect(productCards.length).toBe(mockProducts.length);
  });
});
