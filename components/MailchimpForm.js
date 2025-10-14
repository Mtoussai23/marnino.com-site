import { useState, useRef, useEffect } from "react";

export default function MailchimpForm({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ACTION_URL =
    "https://media.us3.list-manage.com/subscribe/post?u=d3f8a406a389c71ccbbf270da&id=ba568ed03d&f_id=004135e2f0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Subscribe to newsletter"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✖
        </button>

        <h2 className="text-2xl font-serif font-bold text-[#2A1A1F] mb-1">
          Subscribe
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Get updates on releases, shows, and new work.
        </p>

        {/* Native form posts straight to Mailchimp */}
        <form
          action={ACTION_URL}
          method="post"
          target="_blank"
          noValidate
          onSubmit={() => setSubmitting(true)}
        >
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="mce-FNAME"
          >
            First name
          </label>
          <input
            type="text"
            name="FNAME"
            id="mce-FNAME"
            className="w-full rounded-lg border border-gray-300 p-2 mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#CBB7B0]"
            placeholder="Your first name"
            style={{
              color: "#2A1A1F",
              WebkitTextFillColor: "#2A1A1F",
              caretColor: "#2A1A1F",
            }}
          />

          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="mce-LNAME"
          >
            Last name
          </label>
          <input
            type="text"
            name="LNAME"
            id="mce-LNAME"
            className="w-full rounded-lg border border-gray-300 p-2 mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#CBB7B0]"
            placeholder="Your last name"
            style={{
              color: "#2A1A1F",
              WebkitTextFillColor: "#2A1A1F",
              caretColor: "#2A1A1F",
            }}
          />

          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="mce-EMAIL"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            required
            className="w-full rounded-lg border border-gray-300 p-2 mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#CBB7B0]"
            placeholder="you@example.com"
            style={{
              color: "#2A1A1F",
              WebkitTextFillColor: "#2A1A1F",
              caretColor: "#2A1A1F",
            }}
          />

          {/* Honeypot */}
          <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
            <input
              type="text"
              name="b_d3f8a406a389c71ccbbf270da_ba568ed03d"
              tabIndex="-1"
              defaultValue=""
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#2A1A1F] text-[#EAE5DF] py-2 font-semibold hover:opacity-90 transition"
          >
            {submitting ? "Subscribing…" : "Subscribe"}
          </button>

          <p className="mt-3 text-[11px] text-gray-400">
            You’ll be taken to Mailchimp to confirm.
          </p>
        </form>
      </div>
    </div>
  );
}
