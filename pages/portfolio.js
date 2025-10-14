import Footer from "../components/Footer";

export default function Portfolio() {
  const projects = [
    {
      title: "Medusa",
      type: "Video",
      youtubeId: "NgTgPrQ1iJo",
      description:
        "Short film/music video I wrote, shot, and directed.",
    },
    {
      title: "Marnino Toussaint — Who Yo' Stylist (Visualizer)",
      type: "Video",
      youtubeId: "6pURAeUyUQI",
      description:
        "Dreamy visualizer I directed to amplify the track’s fashion-forward mood with color-led storytelling.",
    },
    {
      title: "Ghetto Bird",
      type: "Video",
      youtubeId: "1PbIHiGfT6w",
      description:
        "Concept-to-screen piece I executive produced. Built the team, look, and post to bring the idea to life.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-4 text-center">Portfolio</h1>
        <p className="text-md text-gray-700 mb-16 text-center max-w-xl mx-auto">
          My lens focuses on truth, mood, and memory. Whether behind the camera or directing a vision, I aim to create work that feels intimate and intentional.
        </p>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Responsive 16:9 YouTube embed */}
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
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
