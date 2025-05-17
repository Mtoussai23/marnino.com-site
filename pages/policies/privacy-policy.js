import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center">Privacy Policy</h1>

        <div className="bg-white p-6 rounded-xl border border-[#CBB7B0] shadow-sm space-y-6 text-sm leading-relaxed">
          <p>
            Your privacy matters. This site does not collect personal data unless you voluntarily provide it (like subscribing to an email list or submitting a message).
          </p>
          <p>
            I use analytics to understand how visitors engage with the site, but no personal details are tracked or shared. Any email or contact info you provide will only be used to connect with you directly.
          </p>
          <p>
            Your info will never be sold, spammed, or shared without your consent. Period.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
