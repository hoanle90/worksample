import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCart } from "../store/cartSlice";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "../components/ErrorBoundary"; 
import "../styles/globals.css";

function MyApp({ Component, ...rest }: AppProps) {
  const { props } = wrapper.useWrappedStore(rest);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ErrorBoundary>
        <Component {...props.pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default wrapper.withRedux(MyApp);
