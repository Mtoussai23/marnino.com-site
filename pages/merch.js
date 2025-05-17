import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Merch() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const merchItems = [
    { id: "blush-hoodie", name: "Blush Hoodie", price: 40, color: "#CBB7B0" },
    { id: "ash-tee", name: "Ash Mauve Tee", price: 30, color: "#B48EAE" },
    { id: "firsthouse-hat", name: "First House Hat", price: 25, color: "#A39193" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const addToCart = (item) => {
    const updated = [...cartItems, item];
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <Header />

      {/* Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="backdrop-blur-sm border border-[#CBB7B0] text-[#2A1A1F] bg-white/30 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all font-medium"
        >
          🛒 {cartItems.length}
        </button>
      </div>

      {/* Cart Panel */}
      {cartOpen && (
        <div className="fixed top-16 right-4 bg-white border border-[#CBB7B0] rounded-lg shadow-lg p-4 w-72 z-50">
          <h3 className="text-lg font-bold mb-3">Your Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">No items added yet.</p>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{item.name}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* View Cart Button inside the panel */}
              <a
                href="/cart"
                className="block w-full text-center bg-[#CBB7B0] text-white py-2 rounded-full hover:bg-[#bfa19c] transition text-sm font-medium"
              >
                View Cart →
              </a>
            </>
          )}
        </div>
      )}

      {/* Main Merch Grid */}
      <div className="pt-24 px-6 text-center">
        <h1 className="text-5xl font-serif font-bold mb-10">Merch</h1>
        <p className="text-lg text-gray-700 mb-16">New Drops Coming Soon</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="w-64 h-auto rounded-2xl border-2 border-[#CBB7B0] bg-white p-6 shadow-md flex flex-col items-center"
            >
              <div
                className="w-20 h-20 rounded-full mb-4"
                style={{ backgroundColor: item.color }}
              ></div>
              <p className="text-md font-semibold mb-2">{item.name}</p>
              <p className="text-sm text-gray-600 mb-4">${item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="text-sm px-4 py-2 rounded-full border border-[#CBB7B0] bg-white/30 backdrop-blur-sm text-[#2A1A1F] hover:shadow-md transition-all"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
