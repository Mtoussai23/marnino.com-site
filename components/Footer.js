import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1B23] text-[#EAE5DF] py-12 px-8 mt-24 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">

        {/* Social Links */}
        <div>
          <h3 className="font-bold mb-4">Follow Me</h3>
          <div className="flex flex-col space-y-2">
            <a href="https://www.instagram.com/marnino_" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="https://www.tiktok.com/@marninot" target="_blank" rel="noopener noreferrer" className="hover:underline">TikTok</a>
            <a href="https://www.facebook.com/MarninoT/" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <div className="flex flex-col space-y-2">
            <Link href="/policies/terms-of-service" className="hover:underline">Terms & Conditions</Link>
            <Link href="/policies/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/policies/faq" className="hover:underline">FAQs</Link>
          </div>
        </div>

        {/* Email Subscription */}
        <div>
          <h3 className="font-bold mb-4">Stay Updated</h3>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded bg-[#EAE5DF] text-[#1C1B23] placeholder-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-[#CBB7B0] text-white py-2 px-4 rounded hover:bg-[#b8a29b] transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
}
