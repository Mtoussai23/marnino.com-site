import Footer from "../../components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center">Refund Policy</h1>

        <div className="bg-white p-6 rounded-xl border border-[#CBB7B0] shadow-sm space-y-6 text-sm leading-relaxed">
          <p>
            All sales are final. Because most items are limited release and made-to-order, I cannot accept returns or offer refunds once a purchase is completed.
          </p>
          <p>
            If your item arrives damaged or you received the wrong item, please contact me within 7 days of delivery and I’ll do my best to make it right.
          </p>
          <p>
            Please double-check your size, shipping address, and order details before submitting.
          </p>
          <p>
            Questions? Reach out using the contact info in the footer and I’ll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
