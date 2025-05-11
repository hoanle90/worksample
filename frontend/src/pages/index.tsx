
import Head from "next/head";
import ProductList from "../components/ProductList";
import CartSummary from "../components/CartSummary";
import Pagination from "../components/Pagination";
import { GetServerSideProps } from "next";
import { Product } from "../types";

interface HomeProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function Home({ products, currentPage, totalPages }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <Head>
        <title>Sample Store | Buy Fashionable Products Online</title>
        <meta
          name="description"
          content="Explore a wide range of Sample clothing, shoes, and accessories at affordable prices. Shop now and enjoy great deals!"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Sample Store" />
        <meta
          property="og:description"
          content="Discover the latest in fashion with our exclusive collection of products. Get your favorite items today!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://samplestore.com" />
        <meta
          property="og:image"
          content="http://samplestore.com/og-image.jpg"
        />
        <meta property="og:site_name" content="Sample Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">🛍️ Sample Store</h1>
        <CartSummary />
      </header>

      <ProductList products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt((context.query.page as string) || "1", 10);
  const limit = 20;

  try {
    const res = await fetch(`http://localhost:4000/products?page=${page}&limit=${limit}`);
    const { products, total } = await res.json();

    return {
      props: {
        products,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};


/*

1) 3000 products , items done
2) typescript done
3) unit test done
4) clean code 
5) add db ? maybe
6) diagram , text, picture
7) more SEO ?
8) list question and scaling 
9) error handler, 404 page ? error ? done
10) styling look better ? mobile done
11) lazy load ? paging or infinity loading
12) security , husky, tool, audit package ?
13) get some random images ?


*/
