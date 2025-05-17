import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <Header />

      <div className="pt-24 px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-8 space-y-4 text-left">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white border border-[#CBB7B0] rounded-lg p-4 shadow"
                >
                  <span>{item.name} — ${item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-lg font-semibold mb-6">Total: ${total}</div>

            <button className="bg-[#CBB7B0] text-white px-6 py-2 rounded-full hover:bg-[#bfa19c] transition">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
