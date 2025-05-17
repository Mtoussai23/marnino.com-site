import Footer from "../../components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center">Terms of Service</h1>

        <div className="bg-white p-6 rounded-xl border border-[#CBB7B0] shadow-sm space-y-6 text-sm leading-relaxed">
          <p>
            By accessing or purchasing from this site, you agree to respect the creative work presented here. All visuals, music, and written content are owned by Marnino Toussaint unless otherwise stated.
          </p>
          <p>
            You may not copy, reproduce, or redistribute any content without permission. Violations of this will be treated as copyright infringement.
          </p>
          <p>
            I reserve the right to update these terms at any time. Continued use of this site implies your acceptance of any changes.
          </p>
          <p>
            If you have questions about these terms, please reach out via the contact form or email listed in the footer.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
