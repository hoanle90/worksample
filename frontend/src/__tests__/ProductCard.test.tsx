import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../types";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
  }));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    toast: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  name: "Test Product",
  price: 20,
};


function renderWithStore(cartState = {}) {
  const store = configureStore({
    reducer: {
      cart: () => cartState,
    },
  });

  return render(
    <Provider store={store}>
      <ProductCard product={mockProduct} />
    </Provider>
  );
}

describe("ProductCard", () => {
  it("renders 'Add to Cart' button when product is not in cart", () => {
    renderWithStore();
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
  });

  it("renders quantity and controls when product is in cart", () => {
    renderWithStore({
      [mockProduct.id]: { product: mockProduct, quantity: 2 },
    });

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls addToCart and shows toast when 'Add to Cart' is clicked", () => {
    const dispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatch);

    renderWithStore();

    fireEvent.click(screen.getByText(/Add to Cart/i));
    expect(dispatch).toHaveBeenCalledWith({ type: "cart/addToCart", payload: mockProduct });
  });

  it("calls updateQuantity when increment is clicked", () => {
    const dispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatch);

    renderWithStore({
      [mockProduct.id]: { product: mockProduct, quantity: 1 },
    });

    fireEvent.click(screen.getByLabelText("increment"));

    expect(dispatch).toHaveBeenCalledWith({
      type: "cart/updateQuantity",
      payload: { id: mockProduct.id, quantity: 2 },
    });
  });

});
