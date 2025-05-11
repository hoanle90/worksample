import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../store/cartSlice";
import { RootState } from "../store/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "../types/index";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const quantity = cart[product.id]?.quantity || 0;

  const increment = () => {
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
    toast.success("Quantity increased");
  };

  const decrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
      toast.success("Quantity decreased");
    } else {
      dispatch(removeFromCart(product.id));
      toast("Item removed from cart", { icon: "🗑️" });
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    toast("Item removed from cart", { icon: "🗑️" });
  };

  const handleAdd = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  return (
    <div data-testid="product-card" className="bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-200 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>

      {!quantity ? (
        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-1.5 px-3 rounded hover:bg-indigo-700 transition text-sm"
        >
          <Plus size={16} /> Add to Cart
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              aria-label="decrement"
              className="p-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              <Minus size={16} />
            </button>
            <span className="w-6 text-center text-sm text-gray-800">
              {quantity}
            </span>
            <button
              onClick={increment}
              aria-label="increment"
              className="p-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="w-full flex items-center justify-center gap-1 text-sm bg-red-100 text-red-600 py-1.5 px-2 rounded hover:bg-red-200 transition"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      )}
    </div>
  );
}
