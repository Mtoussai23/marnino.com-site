import Image from "next/image";
import Footer from "../components/Footer";

export default function Poetry() {
  const poems = [
    {
      title: "If Memory Had a Home",
      type: "Spoken Word Video",
      image: "/placeholders/poem1.jpg",
      description: "Performed at The Moth x HBO — a poem on love, place, and the weight of remembering.",
    },
    {
      title: "The Sky Ain’t Blue for No Reason",
      type: "Written Poem",
      image: "/placeholders/poem2.jpg",
      description: "Excerpt from my upcoming poetry book, exploring masculinity and myth in the South.",
    },
    {
      title: "I Carried the Water",
      type: "Chapbook",
      image: "/placeholders/poem3.jpg",
      description: "A limited-edition chapbook designed around Black rituals, silence, and sacred anger.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-4 text-center">Poetry</h1>
        <p className="text-md text-gray-700 mb-16 text-center max-w-xl mx-auto">
          I write to name what we carry. 
        </p>

        {/* Poetry Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {poems.map((poem, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={poem.image}
                  alt={poem.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-1">{poem.title}</h2>
                <p className="text-sm italic text-gray-600 mb-2">{poem.type}</p>
                <p className="text-sm">{poem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
