import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import { CartItem, Product } from "../types/index";

export default function CartSummary() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const totalItems = (Object.values(cart) as CartItem[]).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = (Object.values(cart) as CartItem[]).reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const handleClear = () => {
    dispatch(clearCart());
    toast("Cart cleared", { icon: "🗑️" });
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium">🛒 Cart</span>
        <span className="bg-indigo-600 text-white text-sm font-semibold px-2 py-1 rounded-full">
          {totalItems}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        Total:{" "}
        <span className="font-semibold text-gray-800">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
      <button
        onClick={handleClear}
        className="mt-2 text-xs text-red-500 hover:underline"
      >
        Clear Cart
      </button>
    </div>
  );
}
