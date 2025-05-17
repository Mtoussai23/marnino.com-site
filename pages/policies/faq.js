import Footer from "../../components/Footer";

export default function FAQ() {
  const faqs = [
    {
      question: "Where can I buy your merch?",
      answer: "Merch drops are announced on my Instagram (@marnino_) and posted on the merch section of my website. Everything’s made in limited runs — once it’s gone, it’s gone.",
    },
    {
      question: "How can I book you for a performance or speaking engagement?",
      answer: "You can reach out via my contact page or send an inquiry directly to my email (check the footer). Please include date, location, type of event, and any budget info.",
    },
    {
      question: "Where can I listen to your music?",
      answer: "You can stream all my releases on Spotify, Apple Music, TIDAL, YouTube Music, and more. Just search 'Marnino Toussaint' or hit the music tab on this site.",
    },
    {
      question: "Are you open to collaborations?",
      answer: "Absolutely — I love building with other creatives. Whether it’s music, visuals, or writing, feel free to reach out with your idea and links to past work.",
    },
    {
      question: "Do you publish your poetry anywhere?",
      answer: "Some of my poetry is in print, some is in performance. I occasionally release pieces online or through shows, and I’m working on a new book right now.",
    },
    {
      question: "How can I support your work?",
      answer: "Showing up means the world. Come to a show. Share a video. Cop some merch. Read a poem. Tell someone about the art. I move with community — always."
    },
  ];

  return (
    <div className="min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center">FAQs</h1>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white p-6 rounded-xl border border-[#CBB7B0] shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-sm text-gray-800 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
