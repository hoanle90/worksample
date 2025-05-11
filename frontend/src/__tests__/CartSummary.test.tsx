import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartSummary from "../components/CartSummary";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CartItem, Product } from "../types";
import toast from "react-hot-toast";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));


jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  

const mockProduct: Product = {
  id: 123,
  name: "Mock Product",
  price: 25,
};

const mockCart: Record<string, CartItem> = {
  p1: {
    product: mockProduct,
    quantity: 2,
  },
};

function renderWithStore(cart = mockCart) {
  const store = configureStore({
    reducer: {
      cart: () => cart,
    },
  });

  return render(
    <Provider store={store}>
      <CartSummary products={[mockProduct]} />
    </Provider>
  );
}

describe("CartSummary", () => {
    beforeEach(() => {
        mockDispatch.mockClear();
        (toast as jest.Mock).mockClear();
      });

  it("renders total items and price", () => {
    renderWithStore();

    expect(screen.getByText(/🛒 Cart/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("calls clearCart and shows toast when 'Clear Cart' is clicked", () => {
    renderWithStore();

    const clearButton = screen.getByText(/Clear Cart/i);
    fireEvent.click(clearButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "cart/clearCart" });
    expect(toast).toHaveBeenCalledWith("Cart cleared", { icon: "🗑️" });

  });
});
