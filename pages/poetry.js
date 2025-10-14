import Footer from "../components/Footer";

export default function Poetry() {
  const poems = [
    {
      title: "Dandelions",
      type: "Video",
      youtubeId: "stRHrnYjnpo",
      description:
        "A meditation on influence and inspiration. A reflection on the reciprocity between student and teacher, and the art that blooms from it.",
    },
    {
      title: "Something Beautiful",
      type: "Video",
      youtubeId: "m-4ixZuJLc4",
      description:
        "Something Beautiful is the imagery that America needs.",
    },
    {
      title: "Devontae's Name",
      type: "Video",
      youtubeId: "lfFJxfvXM2k",
      description:
        "A gut-wrenching performance that channels Shakespeare when asking “what’s in a name?” like Devonte.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-4 text-center">Poetry</h1>
        <p className="text-md text-gray-700 mb-16 text-center max-w-xl mx-auto">
          I write to name what we carry.
        </p>

        {/* Poetry Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {poems.map((poem, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Responsive YouTube Embed */}
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${poem.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                  title={poem.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
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
