import events from "../data/events";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EventsPage() {
  // Helper: normalize "today" to midnight so comparisons are clean
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1) Only keep upcoming (today or later)
  const upcoming = events
    .filter((e) => {
      const d = new Date(e.date);
      d.setHours(0, 0, 0, 0);
      return d >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // 2) First upcoming + the rest
  const hasUpcoming = upcoming.length > 0;
  const upcomingEvent = hasUpcoming ? upcoming[0] : null;
  const remainingEvents = hasUpcoming ? upcoming.slice(1) : [];

  return (
    <div className="min-h-screen bg-[#EAE5DF] text-[#2A1A1F]">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-16 px-4 md:px-16">
        {/* Featured Video */}
        <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg">
          <video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  poster="/poster.jpg" // optional: put a poster image in /public
  className="w-full h-auto object-cover"
  src="/videos/hero.mp4" // ← if hosted, replace with your full https:// URL
/>


          {/* Floating Upcoming Event Box (only if we actually have one) */}
          {hasUpcoming && (
            <div className="absolute top-8 right-8 bg-[#CBB7B0]/80 backdrop-blur-md border border-[#CBB7B0] p-6 rounded-lg shadow-md max-w-sm text-[#2A1A1F]">
              <h2 className="text-2xl font-bold mb-2">{upcomingEvent.title}</h2>
              <p className="text-sm">
                {upcomingEvent.date} • {upcomingEvent.time}
              </p>
              <p className="text-sm mb-4">
                {upcomingEvent.city} - {upcomingEvent.venue}
              </p>
              <a
                href={upcomingEvent.ticketEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-[#CBB7B0] text-white px-4 py-2 rounded hover:bg-[#b8a29b]"
              >
                Get Tickets
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Shows Grid */}
      <div className="py-20 px-8 mt-16">
        <h2 className="text-4xl font-serif text-center mb-12">Upcoming Shows</h2>

        {hasUpcoming ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingEvents.map((event, index) => (
              <div
                key={index}
                className="border border-[#CBB7B0] rounded-lg p-6 bg-white text-[#2A1A1F] shadow-md"
              >
                <h3 className="text-2xl font-serif mb-2">{event.title}</h3>
                <p className="text-gray-700">
                  {event.date} • {event.time}
                </p>
                <p className="text-gray-700">
                  {event.city} - {event.venue}
                </p>
                <p className="mt-2">{event.description}</p>
                <a
                  href={event.ticketEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-[#CBB7B0] text-white px-4 py-2 rounded hover:bg-[#b8a29b]"
                >
                  Get Tickets
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-white border border-[#CBB7B0] rounded-xl p-10 shadow-md">
            <p className="text-lg">
              No upcoming events right now — check back soon.
            </p>
          </div>
        )}
      </div>

      {/* Final Footer */}
      <Footer />
    </div>
  );
}
