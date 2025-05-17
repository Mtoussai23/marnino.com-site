import Image from "next/image";
import Footer from "../components/Footer";

export default function Portfolio() {
  const projects = [
    {
      title: "Selfhood Series",
      type: "Photography",
      image: "/placeholders/photo1.jpg",
      description: "A portrait series exploring Black intimacy and identity in urban spaces.",
    },
    {
      title: "Unspoken",
      type: "Short Film (Director)",
      image: "/placeholders/film1.jpg",
      description: "Directed this short to capture emotional tension in quiet, domestic moments.",
    },
    {
      title: "Glory Days",
      type: "Music Video (DP)",
      image: "/placeholders/video1.jpg",
      description: "Served as Director of Photography for this nostalgia-heavy R&B visual.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-4 text-center">Portfolio</h1>
        <p className="text-md text-gray-700 mb-16 text-center max-w-xl mx-auto">
          My lens focuses on truth, mood, and memory. Whether behind the camera or directing a vision, I aim to create work that feels intimate and intentional. Here's a glimpse into the worlds I've helped shape.
        </p>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-1">{project.title}</h2>
                <p className="text-sm italic text-gray-600 mb-2">{project.type}</p>
                <p className="text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
